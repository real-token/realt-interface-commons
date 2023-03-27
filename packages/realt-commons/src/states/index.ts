import { atomWithStorage } from "jotai/utils";

export const providerAtom = atomWithStorage<string>("provider","");