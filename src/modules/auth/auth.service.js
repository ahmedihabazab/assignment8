import mongoose from "mongoose";
import {
  ConflictException,
  NotFoundException,
} from "../../common/exeption/app.exception.js";
import { create, findOne } from "../../DB/repo/db.repo.js";
import usersModel from "../../models/users.model.js";
import { compare, hash } from "bcrypt";
import { compareHash, hashValue } from "../../common/security/hash.js";
import { hashToolEnumObj } from "../../common/enum/security.enum.js";
import { decryptValue, encryptValue } from "../../common/security/encrypt.js";

export async function signup(reqBody) {
  const emailMatched = await findOne({
    model: usersModel,
    filter: { email: reqBody.email },
  });
  if (emailMatched) {
    throw ConflictException({ errMsg: "Email Already Exist" });
  }
  reqBody.password = await hashValue({
    tool: hashToolEnumObj.ARGON,
    value: reqBody.password,
  });
  reqBody.phone = await encryptValue({value : reqBody.phone})
  const createResult = await create({ model: usersModel, data: reqBody });
  return createResult;
}

export async function login(reqBody) {
  const userMatched = await findOne({
    model: usersModel,
    filter: { email: reqBody.email },
  });
  if (!userMatched) {
    throw ConflictException({ errMsg: "invalid email or password" });
  }
  const compareResult = await compareHash({
    tool: hashToolEnumObj.ARGON,
    value: reqBody.password,
    hash: userMatched.password,
  });
  if (!compareResult) {
    throw ConflictException({ errMsg: "invalid email or password" });
  }
  userMatched.phone = await decryptValue({ciphertext : userMatched.phone}) 
  return userMatched;
}
