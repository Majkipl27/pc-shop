import { atom } from "jotai";
import { User } from "./interfaces";

const userAtom = atom<User | null>(null);

export { userAtom };