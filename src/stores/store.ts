import { defineStore } from "pinia";
interface task {
  title: string;
  done: boolean;
}

export const useCounterStore = defineStore("counter", {
  state: () => ({
    tasks: [] as task[],
  }),

  persist: {
    enabled: true,
    strategies: [
      {
        key: "tasks",
        storage: localStorage,
      },
    ],
  },
});
