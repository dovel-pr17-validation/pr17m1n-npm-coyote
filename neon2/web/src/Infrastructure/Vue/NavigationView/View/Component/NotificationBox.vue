<template>
  <div class="bg-tile text-neutral2-500 px-2 md:px-4 pt-4 border-t md:border border-tile-border md:rounded-lg">
    <div class="flex justify-between font-medium text-sm">
      <a href="/User/Notifications" class="text-green2-500">
        Powiadomienia
        <Icon name="notificationSeeAll"/>
      </a>
      <span class="md:cursor-pointer" v-text="'Oznacz jako przeczytane'" @click="markAllAsViewed"/>
    </div>
    <hr class="text-tile-border mt-3">
    <div class="h-130 py-3 overflow-y-scroll" @scroll.passive="scroll">
      <div v-for="notification in props.notifications"
           class="px-3 py-2.5 mb-1 flex rounded-lg"
           :class="{'text-green2-600 bg-green2-100 dark:text-neutral2-600 dark:bg-tile-nested':notification.notificationHighlighted}">
        <a class="size-10 rounded user-avatar flex-shrink-0 mt-0.5" :href="notification.actorProfileHref">
          <img :src="notification.actorAvatarUrl" v-if="notification.actorAvatarUrl" class="rounded size-10 object-cover"/>
          <div v-text="notification.actorInitials" v-else class="text-center leading-10 border border-green2-300 rounded"/>
        </a>
        <a class="ml-3 min-w-0 flex-grow-1" :href="notification.contentHref">
          <div class="xs:flex xs:justify-between text-sm">
            <div class="flex items-center order-1 xs:order-3" v-text="notification.notificationDate"/>
            <div v-text="notification.notificationTitle" class="order-2"/>
          </div>
          <div
            class="truncate font-medium text-green2-500"
            :class="notification.notificationHighlighted ? '' : 'dark:text-neutral2-600'"
            v-text="notification.contentTitle"/>
          <div v-text="notification.contentPreview" class="truncate text-sm w-17/20"/>
        </a>
      </div>
      <div v-if="props.notifications.length === 0" class="text-center py-8">
        Nie masz żadnych powiadomień.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {Notification} from "../../../../../Domain/Navigation/Notification";
import Icon from "../../../Icon/Icon.vue";

const props = defineProps<Props>();
const emit = defineEmits(['markAll', 'loadMore']);

interface Props {
  notifications: Notification[];
}

onMounted(() => {
  if (props.notifications.length === 0) {
    loadMore();
  }
});

function markAllAsViewed(): void {
  emit('markAll');
}

function loadMore(): void {
  emit('loadMore');
}

function scroll(event: Event): void {
  if (scrolledToBottom(event)) loadMore();
}

function scrolledToBottom(event: Event): boolean {
  const element: HTMLElement = event.target;
  const distanceToBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight);
  return distanceToBottom < 1;
}
</script>
