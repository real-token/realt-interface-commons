import { atomWithStorage } from "jotai/utils";

export const providerAtom = atomWithStorage<string>("provider","");
export const readOnlyAddressAtom = atomWithStorage<string|undefined>("readOnlyAddress",undefined);