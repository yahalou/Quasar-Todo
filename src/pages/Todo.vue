<template>
  <q-page class="column bg-grey-3">
    <div class="row q-pa-sm bg-primary">
      <q-input
        v-model="newTask"
        placeholder="Add task"
        dense
        bg-color="white"
        class="col"
        square
        @keyup.enter="addTask"
        filled
      >
        <template v-slot:append>
          <q-btn round dense flat icon="add" @click="addTask" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" bordered separator>
      <q-item
        v-for="(task, index) in tasks"
        :key="task.title"
        tag="label"
        v-ripple
        clickable
        :class="{ 'done bg-blue-1': task.done }"
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="task.done"
            color="primary"
            class="no-pointer-events"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="task.done" side>
          <q-btn
            flat
            round
            color="primary"
            icon="delete"
            @click.stop="deleteTask(index)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!tasks.length" class="no-tasks absolute-center">
      <q-icon name="check" size="100px" color="primary"></q-icon>
      <div class="text-h5 text-primary text-center">No tasks</div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useCounterStore } from "src/stores/store";

const store = useCounterStore();
const tasks = computed(() => store.tasks);

const newTask = ref("");
const $q = useQuasar();

function deleteTask(index: number) {
  $q.dialog({
    title: "Confirm",
    message: "Realy delete?",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    store.tasks.splice(index, 1);
    $q.notify("Task deleted");
  });
}

function addTask() {
  store.tasks.push({ title: newTask.value, done: false });
  newTask.value = "";
}
</script>

<style lang="css" scoped>
.done .q-item__label {
  text-decoration: line-through;
  color: #bbb;
}

.no-tasks {
  opacity: 0.5;
}
</style>
