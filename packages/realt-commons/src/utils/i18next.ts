import { Resource } from 'i18next';

export const mergeRessources = (localeRessource: Resource, customRessource: Resource|undefined): Resource => {
    if(!customRessource) return localeRessource;

    const newRessources: Resource = {};

    Array.from(Object.keys(localeRessource)).forEach(element => {
        newRessources[element] = {
            ...localeRessource[element],
            ...customRessource[element]
        }
    });

    return newRessources;
}