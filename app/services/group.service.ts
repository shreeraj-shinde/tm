"use server";

import { prisma } from "@/lib/prisma";
import { Group } from "@prisma/client";

export const createGroup = async (group: Group) => {
  const response = await prisma.group.create({
    data: group,
  });
  return response;
};

export const getGroups = async () => {
  const response = await prisma.group.findMany({
    include: {
      users: true,
      Task: true,
    },
  });
  return response;
};
