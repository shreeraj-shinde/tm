"use server";
import { prisma } from "@/lib/prisma";
import { User } from "@/types";

export const createUser = async (user: User) => {
  const response = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      type: user.type,
    },
  });
  console.log(response);
  return response;
};

export const fetchUsers = async () => {
  const response = await prisma.user.findMany({
    include: {
      Group: true,
      Task: true,
    },
  });
  return response;
};

export const addUserToGroup = async (userId: string, groupId: string) => {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      users: true,
      Task: true,
    },
  });

  const response = await prisma.user.update({
    where: { id: userId },
    data: {
      Group: { connect: { id: groupId } },
      Task: { connect: group?.Task.map((task) => ({ id: task.id })) },
    },
    include: {
      Group: true,
      Task: true,
    },
  });
  const updatedUsers = await fetchUsers();
  return updatedUsers;
};
