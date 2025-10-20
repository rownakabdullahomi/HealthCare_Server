import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../shared/prisma";
import { paginationHelper } from "../../helpers/paginationHelper";
import { Prisma } from "@prisma/client";

const insertIntoDb = async (payload: any) => {
  const { startTime, endTime, startDate, endDate } = payload;

  console.log({ startDate, endDate, startTime, endTime });

  const intervalTime = 30;
  const schedules = [];

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const dayStart = new Date(format(currentDate, "yyyy-MM-dd") + "T00:00:00");

    const startDateTime = addMinutes(
      addHours(dayStart, Number(startTime.split(":")[0])),
      Number(startTime.split(":")[1])
    );

    const endDateTime = addMinutes(
      addHours(dayStart, Number(endTime.split(":")[0])),
      Number(endTime.split(":")[1])
    );

    console.log({ startDateTime, endDateTime });

    let slotStartDateTime = new Date(startDateTime);

    while (slotStartDateTime < endDateTime) {
      const slotEndDateTime = addMinutes(slotStartDateTime, intervalTime);

      const scheduleData = {
        startDateTime: slotStartDateTime,
        endDateTime: slotEndDateTime,
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: scheduleData,
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }

      // move to next 30-min slot
      slotStartDateTime = addMinutes(slotStartDateTime, intervalTime);
    }

    // move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const schedulesForDoctor = async (filters: any, options: any) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const { startDateTime: filterStartDateTime, endDateTime: filterEndDateTime } =
    filters;

  const andConditions: Prisma.ScheduleWhereInput[] = [];

  if (filterStartDateTime && filterEndDateTime) {
    andConditions.push({
      AND: [
        {
          startDateTime: {
            gte: filterStartDateTime,
          },
          endDateTime: {
            lte: filterEndDateTime,
          },
        },
      ],
    });
  }

  const whereConditions: Prisma.ScheduleWhereInput =
    andConditions.length > 0
      ? {
          AND: andConditions,
        }
      : {};

  const result = await prisma.schedule.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.schedule.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  }
};

const deleteScheduleFromDb = async (id: string)=> {
  return prisma.schedule.delete({
    where: {
      id
    }
  })
}

export const ScheduleService = {
  insertIntoDb,
  schedulesForDoctor,
  deleteScheduleFromDb
};
