import {create} from 'zustand';
import {GlobalState, Podcast} from "../index";
import {devtools} from "zustand/middleware";

export const useGlobal = create<GlobalState>()(devtools((set) => ({
    selected: {
        categories: [],
        podcasts: [],
    },
    toggleCategory: (cat: string) => set(
        (state) => {
            if (state.selected.categories.includes(cat)) {
                const newCats = state.selected.categories.filter((c) => c !== cat);
                return {selected: {...state.selected, categories: newCats}}
            }
            return {selected: {...state.selected, categories: [...state.selected.categories, cat]}}
        }),
    togglePodcast: (pod: Podcast) => set(
        (state) => {
            if (state.selected.podcasts.includes(pod)) {
                const newPods = state.selected.podcasts.filter((p) => p !== pod);
                return {selected: {...state.selected, podcasts: newPods}}
            }
            return {selected: {...state.selected, podcasts: [...state.selected.podcasts, pod]}}
        }),
})));