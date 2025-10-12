import { prisma } from "../../shared/prisma";
import { createPatientInput } from "./user.interface";
import bcrypt from "bcryptjs";

const createPatient = async(payload: createPatientInput) => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const result = await prisma.$transaction(async(trx)=>{
        await trx.user.create({
            data:{
                email: payload.email,
                password: hashedPassword,
            }
        });

        return await trx.patient.create({
            data:{
                name: payload.name,
                email: payload.email,
            }
        })
    })

    return result;
}


export const userService = {
    createPatient
}