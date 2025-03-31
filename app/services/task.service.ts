"use server";
import { prisma } from "@/lib/prisma";
import { Task, User } from "@/types";

export const addTask = async (task: Task) => {
  const response = await prisma.task.create({
    data: {
      title: task.title,
      type: task.type,
    },
  });
  return response;
};

export const fetchTasks = async () => {
  const response = await prisma.task.findMany({
    include: {
      assignedTo: true,
      assignedToGroup: true,
    },
  });
  return response;
};

// export const assignTaskToUser = async (taskId: string, userId: string) => {
//   const response = await prisma.task.update({
//     where: { id: taskId },
//     data: { assignedTo: { connect: { id: userId } } },
//   });
//   return response;
// };

export const assignTaskToUser = async (
  taskId: string,
  userId: string,
  tasks: Task[]
) => {
  const response = await prisma.task.update({
    where: { id: taskId },
    data: { assignedTo: { connect: { id: userId } } },
    include: {
      assignedTo: true,
      assignedToGroup: true,
    },
  });
  const newTasks = tasks.map((task) => {
    if (task.id === response.id) {
      return response;
    }
    return task;
  });
  return newTasks;
};

export const assignTaskToGroup = async (
  taskId: string,
  groupId: string,
  tasks: Task[]
) => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { users: true },
  });
  const response = await prisma.task.update({
    where: { id: taskId },
    data: {
      assignedToGroup: { connect: { id: groupId } },
      assignedTo: { connect: group?.users.map((user) => ({ id: user.id })) },
    },
    include: {
      assignedTo: true,
      assignedToGroup: true,
    },
  });
  const newTasks = tasks.map((task) => {
    if (task.id === response.id) {
      return response;
    }
    return task;
  });
  return newTasks;
};
