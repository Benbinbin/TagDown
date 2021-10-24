<template>
  <footer class="w-full px-4 py-2 flex justify-between items-end border-t border-gray-200">
    <!-- expand window -->
    <div class="opacity-0">
      占位容器
    </div>
    <!-- <button
      title="expand window button"
      class="w-10 h-10 h-center text-gray-400 hover:bg-gray-200 hover:text-gray-800 rounded"
    >
      <svg
        class="w-6 h-6"
        viewBox="0 0 50 50"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M42 9.54642V18.8182C42 19.2281 41.8372 19.6212 41.5473 19.911C41.2575 20.2008 40.8644 20.3636 40.4545 20.3636C40.0447 20.3636 39.6516 20.2008 39.3617 19.911C39.0719 19.6212 38.9091 19.2281 38.9091 18.8182V13.2766L30.7292 21.4565C30.5857 21.6 30.4153 21.7138 30.2278 21.7915C30.0403 21.8692 29.8393 21.9091 29.6364 21.9091C29.4334 21.9091 29.2324 21.8692 29.0449 21.7915C28.8574 21.7138 28.687 21.6 28.5435 21.4565C28.4 21.313 28.2862 21.1426 28.2085 20.9551C28.1308 20.7676 28.0909 20.5666 28.0909 20.3636C28.0909 20.1607 28.1308 19.9597 28.2085 19.7722C28.2862 19.5847 28.4 19.4143 28.5435 19.2708L36.7234 11.0909H31.1818C30.7719 11.0909 30.3788 10.9281 30.089 10.6383C29.7992 10.3484 29.6364 9.95533 29.6364 9.54545C29.6364 9.13557 29.7992 8.74248 30.089 8.45265C30.3788 8.16282 30.7719 8 31.1818 8H40.4545C40.4603 8 40.4659 8.00077 40.4715 8.00077C40.5168 8.00135 40.5618 8.00328 40.6066 8.00773C40.6315 8.01005 40.6556 8.01468 40.68 8.01835C40.7055 8.02202 40.731 8.02492 40.7561 8.02994C40.7831 8.03535 40.8096 8.04269 40.8363 8.04926C40.8583 8.05506 40.8807 8.05989 40.9027 8.06665C40.9286 8.07438 40.9537 8.08403 40.979 8.09311C41.0012 8.10123 41.0235 8.10857 41.0457 8.11765C41.0689 8.12731 41.0913 8.1387 41.1141 8.14933C41.1372 8.16034 41.1604 8.17058 41.1828 8.18256C41.2043 8.19415 41.2248 8.20709 41.2456 8.21965C41.268 8.23317 41.2908 8.24573 41.3127 8.26022C41.3353 8.27548 41.3565 8.29228 41.3783 8.30851C41.3969 8.32242 41.4162 8.33556 41.4344 8.35043C41.4703 8.37999 41.5047 8.41128 41.5377 8.44393C41.5408 8.44702 41.5443 8.44973 41.5474 8.45262C41.5512 8.45649 41.5547 8.46093 41.5586 8.46499C41.5901 8.49725 41.6208 8.53067 41.6494 8.56544C41.6654 8.58495 41.6793 8.60543 41.6942 8.62533C41.7095 8.64581 41.7251 8.6659 41.7394 8.68695C41.755 8.71014 41.7686 8.73448 41.7829 8.75843C41.7945 8.77775 41.8064 8.79649 41.8171 8.81639C41.8302 8.84073 41.8412 8.86565 41.8528 8.89057C41.8626 8.91163 41.8733 8.9321 41.8822 8.95355C41.8918 8.97769 41.9001 9.00223 41.9088 9.02657C41.9171 9.04975 41.9262 9.07255 41.9332 9.09611C41.9407 9.12084 41.9463 9.14595 41.9525 9.17107C41.9583 9.19502 41.965 9.21859 41.9699 9.24293C41.9757 9.2721 41.9793 9.30147 41.9834 9.33083C41.9863 9.3515 41.9901 9.37159 41.9923 9.39245C41.9974 9.44371 42 9.49503 42 9.54642ZM19.2708 28.5435L11.0909 36.7234V31.1818C11.0909 30.7719 10.9281 30.3788 10.6383 30.089C10.3484 29.7992 9.95533 29.6364 9.54545 29.6364C9.13557 29.6364 8.74248 29.7992 8.45265 30.089C8.16282 30.3788 8 30.7719 8 31.1818V40.4536C8 40.505 8.00258 40.5563 8.00773 40.6075C8.00966 40.6284 8.01372 40.6485 8.01661 40.6692C8.02067 40.6985 8.02434 40.7279 8.03014 40.7571C8.03497 40.7814 8.04173 40.805 8.04752 40.8289C8.0537 40.854 8.05931 40.8792 8.06684 40.9037C8.07399 40.9275 8.08288 40.9501 8.09118 40.9732C8.09988 40.9978 8.10799 41.0223 8.11784 41.0466C8.12673 41.0679 8.13716 41.0884 8.1472 41.1094C8.1588 41.1343 8.16981 41.1593 8.18294 41.1836C8.19357 41.2035 8.20555 41.2223 8.21714 41.2416C8.23143 41.2655 8.24495 41.2899 8.2606 41.313C8.2747 41.3343 8.29055 41.3542 8.30581 41.3745C8.32068 41.3946 8.33459 41.415 8.35062 41.4344C8.37922 41.4693 8.40993 41.5027 8.44142 41.5348C8.44528 41.5389 8.44857 41.5433 8.45262 41.5474C8.45572 41.5505 8.45919 41.553 8.46228 41.5561C8.49532 41.5887 8.5299 41.62 8.56583 41.6496C8.58399 41.6646 8.60331 41.6776 8.62185 41.6917C8.64349 41.7079 8.66474 41.7245 8.68734 41.7396C8.70936 41.7545 8.73235 41.7674 8.75515 41.7809C8.77582 41.7931 8.79572 41.806 8.81697 41.8174C8.84015 41.8298 8.86391 41.8402 8.88767 41.8514C8.90969 41.8619 8.93133 41.8727 8.95393 41.8824C8.97692 41.8916 9.0003 41.8994 9.02348 41.9077C9.04782 41.9164 9.07177 41.9258 9.09689 41.9333C9.12007 41.9403 9.14344 41.9455 9.16682 41.9513C9.19232 41.9577 9.21743 41.9648 9.24332 41.9701C9.27056 41.9755 9.29818 41.9786 9.32542 41.9826C9.34802 41.9857 9.37005 41.99 9.39303 41.9923C9.44365 41.9973 9.49445 42 9.54545 42H18.8182C19.2281 42 19.6212 41.8372 19.911 41.5473C20.2008 41.2575 20.3636 40.8644 20.3636 40.4545C20.3636 40.0447 20.2008 39.6516 19.911 39.3617C19.6212 39.0719 19.2281 38.9091 18.8182 38.9091H13.2766L21.4565 30.7292C21.6 30.5857 21.7138 30.4153 21.7915 30.2278C21.8692 30.0403 21.9091 29.8393 21.9091 29.6364C21.9091 29.4334 21.8692 29.2324 21.7915 29.0449C21.7138 28.8574 21.6 28.687 21.4565 28.5435C21.313 28.4 21.1426 28.2862 20.9551 28.2085C20.7676 28.1308 20.5666 28.0909 20.3636 28.0909C20.1607 28.0909 19.9597 28.1308 19.7722 28.2085C19.5847 28.2862 19.4143 28.4 19.2708 28.5435Z"
        />
      </svg>
    </button> -->
    <!-- bookmark open setting -->
    <div
      v-show="browserType !== 'pin'"
      class="flex space-x-2"
    >
      <div class="flex flex-col justify-between items-center">
        <p class="text-sm text-gray-500">
          书签打开模式
        </p>
        <div class="flex space-x-1">
          <button
            title="set bookmark open mode in single tab"
            class="px-1 py-0.5 text-xs border-2 border-green-400 rounded"
            :class="{
              'text-white bg-green-400 hover:bg-green-600': bookmarkOpenMode === 'single',
              'text-gray-500 hover:text-white bg-white hover:bg-green-400': bookmarkOpenMode !== 'single'
            }"
            @click="$emit('change-bookmark-open-mode', 'single')"
          >
            单页切换
          </button>
          <button
            title="set bookmark open mode in multi tabs"
            class="px-1 py-0.5 text-xs border-2 border-green-400 rounded"
            :class="{
              'text-white bg-green-400 hover:bg-green-600': bookmarkOpenMode === 'multi',
              'text-gray-500 hover:text-white bg-white hover:bg-green-400': bookmarkOpenMode !== 'multi'
            }"
            @click="$emit('change-bookmark-open-mode', 'multi')"
          >
            多页打开
          </button>
        </div>
      </div>
      <div class="p-1 border-2 border-green-400 rounded">
        <div
          v-show="bookmarkOpenMode === 'single'"
          class="space-y-1"
        >
          <div class="p-1 flex items-center space-x-0.5">
            <input
              id="newtab"
              type="radio"
              value="current"
              :checked="singleTab === 'current'"
              @change="$emit('update:singleTab', $event.target.value)"
            >
            <label
              for="newtab"
              class="text-xs text-gray-500"
            >当前标签页</label>
          </div>
          <div class="p-1 flex items-center space-x-0.5">
            <input
              id="currenttab"
              type="radio"
              value="new"
              :checked="singleTab === 'new'"
              @change="$emit('update:singleTab', $event.target.value)"
            >
            <label
              for="currenttab"
              class="text-xs text-gray-500"
            >新建标签页</label>
          </div>
        </div>
        <div
          v-show="bookmarkOpenMode === 'multi'"
          class="space-y-1"
        >
          <div class="flex items-center space-x-1">
            <div class="flex items-center space-x-0.5">
              <input
                id="group"
                type="checkbox"
                :checked="multiOnGroup"
                @change="$emit('update:multiOnGroup', $event.target.checked)"
              >
              <label
                for="group"
                class="text-xs text-gray-500"
              >在组内打开</label>
            </div>
            <button
              title="open bookmark in new tab group"
              class="px-1 py-0.5 text-xs border-2 border-green-400 rounded"
              :class="{
                'opacity-10': !multiOnGroup,
                'text-white bg-green-400 hover:bg-green-600': groupType === 'new',
                'text-gray-500 hover:text-white bg-white hover:bg-green-400': groupType !== 'new'
              }"
              :disabled="!multiOnGroup"
              @click="$emit('update:groupType', 'new')"
            >
              新建标签组
            </button>
            <button
              title="open bookmark in old tab group"
              class="px-1 py-0.5 text-xs border-2 border-green-400 rounded"
              :class="{
                'opacity-10': !multiOnGroup,
                'text-white bg-green-400 hover:bg-green-600': groupType === 'old',
                'text-gray-500 hover:text-white bg-white hover:bg-green-400': groupType !== 'old'
              }"
              :disabled="!multiOnGroup"
              @click="$emit('update:groupType', 'old')"
            >
              已有标签组
            </button>
          </div>

          <div
            class="w-full"
            :class="{ 'opacity-10': !multiOnGroup }"
          >
            <div
              v-show="groupType === 'new'"
              class="w-full flex items-center space-x-1"
            >
              <div class="relative flex items-center">
                <button
                  title="select group color"
                  :disabled="!multiOnGroup || groupType !== 'new'"
                  class="w-3 h-3 rounded-full"
                  :style="{
                    'background': colorMap(newGroupColor)
                  }"
                  @click="showColorPalette = !showColorPalette"
                />
                <div
                  v-show="showColorPalette"
                  class="absolute -top-0 transform -translate-y-full flex p-2 bg-white space-x-2 rounded-sm shadow"
                >
                  <button
                    v-for="color of colorScheme"
                    :key="color.name"
                    :title="color.name"
                    class="w-4 h-4 rounded-full opacity-80 hover:opacity-100"
                    :class="{ 'ring-2 ring-yellow-400': newGroupColor === color.name }"
                    :style="{
                      'background': color.value
                    }"
                    @click="setGroupColorHandler(color.name)"
                  />
                </div>
              </div>
              <input
                class="flex-grow px-1 py-0.5 text-xs border-2 border-gray-300 rounded"
                type="text"
                placeholder="输入 group 名称"
                :disabled="!multiOnGroup || groupType !== 'new'"
                :value="newGroupName"
                @input="$emit('update:newGroupName', $event.target.value)"
              >
            </div>

            <div
              v-show="groupType === 'old'"
              class="relative"
            >
              <button
                v-if="oldGroups.length > 0"
                title="select old groups"
                :disabled="!multiOnGroup || groupType !== 'old'"
                class="p-1 flex items-center hover:bg-gray-200 space-x-0.5 rounded"
                @click="showOldGroups = !showOldGroups"
              >
                <div
                  v-if="currentGroup.color"
                  class="w-3 h-3 rounded-full"
                  :style="{
                    'background': colorMap(currentGroup.color)
                  }"
                />
                <span
                  class="text-xs text-gray-500"
                >{{ currentGroup.id ? currentGroup.title : '请选择标签组' }}</span>
              </button>
              <p
                v-if="oldGroups.length === 0"
                class="p-1 text-xs text-gray-500"
              >
                没有标签组
              </p>
              <div
                v-show="showOldGroups"
                class="p-2 absolute -top-0 transform -translate-y-full bg-white space-y-1 rounded shadow"
              >
                <button
                  v-for="group of oldGroups"
                  :key="group.title"
                  :title="group.title"
                  class="px-1 py-0.5 flex items-center text-xs text-white opacity-80 hover:opacity-100 rounded"
                  :class="{ 'ring-2 ring-yellow-400': currentGroup.id === group.id }"
                  :style="{
                    'background': colorMap(group.color)
                  }"
                  @click="setCurrentGroupIdHandler(group)"
                >
                  {{ group.title }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- edit bookmark -->
    <div class="flex items-center space-x-1.5">
      <button
        title="edit bookmark"
        class="edit-bookmark-btn w-8 h-8 relative h-center bg-cover bg-center bg-no-repeat text-white text-opacity-0 hover:text-opacity-100 rounded"
        :style="{
          backgroundImage:
            'url(' + favicon + ')',
        }"
        @click="changePage('edit')"
      >
        <svg
          class="absolute z-10 w-4 h-4"
          viewBox="0 0 50 50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M43.0724 14.79L34.2112 5.92926C33.9166 5.63465 33.5669 5.40095 33.1819 5.24151C32.797 5.08206 32.3845 5 31.9678 5C31.5512 5 31.1386 5.08206 30.7537 5.24151C30.3688 5.40095 30.019 5.63465 29.7244 5.92926L24.501 11.1525V11.1527L24.5006 11.1529L5.92941 29.7235C5.63386 30.0173 5.39953 30.3669 5.24 30.752C5.08047 31.137 4.9989 31.5499 5.00001 31.9667V40.8274C5.00096 41.6686 5.33552 42.475 5.93032 43.0697C6.52511 43.6645 7.33155 43.9991 8.17271 44H17.6908C17.8991 44 18.1054 43.959 18.2979 43.8793C18.4903 43.7996 18.6652 43.6827 18.8125 43.5354L43.0724 19.2764C43.6664 18.681 44 17.8743 44 17.0332C44 16.1922 43.6664 15.3854 43.0724 14.79ZM17.0338 40.8274H8.17271V31.9667L25.6225 14.5176L34.4837 23.3783L17.0338 40.8274ZM36.727 21.1351L27.866 12.2744L31.9679 8.17246L40.8291 17.0332L36.727 21.1351Z"
          />
        </svg>
      </button>
      <div class="flex flex-col space-y-0.5">
        <p class="text-sm text-gray-600">
          bookmark title
        </p>
        <div
          v-if="currentBookmarkState"
          class="flex items-center space-x-1"
        >
          <span class="text-xs text-green-400">当前页面已收藏</span>
          <button
            title="delete bookmark"
            class="p-1 h-center bg-red-400 hover:bg-red-600 text-white rounded-sm"
            @click="deleteBookmarkHandler"
          >
            <svg
              class="w-3 h-3"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41.5 11H34.0007V9.5C33.9994 8.30694 33.5249 7.16312 32.6813 6.3195C31.8376 5.47588 30.6938 5.00134 29.5007 5H20.5007C19.3077 5.00134 18.1639 5.47588 17.3202 6.3195C16.4766 7.16312 16.0021 8.30694 16.0007 9.5V11H8.5C8.10217 11 7.72064 11.158 7.43934 11.4393C7.15804 11.7206 7 12.1022 7 12.5C7 12.8978 7.15804 13.2794 7.43934 13.5607C7.72064 13.842 8.10217 14 8.5 14H10V41C10.0009 41.7954 10.3173 42.5579 10.8797 43.1203C11.4421 43.6827 12.2046 43.9991 13 44H37C37.7954 43.9991 38.5579 43.6827 39.1203 43.1203C39.6827 42.5579 39.9991 41.7954 40 41V14H41.5C41.8978 14 42.2794 13.842 42.5607 13.5607C42.842 13.2794 43 12.8978 43 12.5C43 12.1022 42.842 11.7206 42.5607 11.4393C42.2794 11.158 41.8978 11 41.5 11ZM22.0007 33.5C22.0007 33.8978 21.8427 34.2794 21.5614 34.5607C21.2801 34.842 20.8986 35 20.5007 35C20.1029 35 19.7214 34.842 19.4401 34.5607C19.1588 34.2794 19.0007 33.8978 19.0007 33.5V21.5C19.0007 21.1022 19.1588 20.7206 19.4401 20.4393C19.7214 20.158 20.1029 20 20.5007 20C20.8986 20 21.2801 20.158 21.5614 20.4393C21.8427 20.7206 22.0007 21.1022 22.0007 21.5V33.5ZM31.0007 33.5C31.0007 33.8978 30.8427 34.2794 30.5614 34.5607C30.2801 34.842 29.8986 35 29.5007 35C29.1029 35 28.7214 34.842 28.4401 34.5607C28.1588 34.2794 28.0007 33.8978 28.0007 33.5V21.5C28.0007 21.1022 28.1588 20.7206 28.4401 20.4393C28.7214 20.158 29.1029 20 29.5007 20C29.8986 20 30.2801 20.158 30.5614 20.4393C30.8427 20.7206 31.0007 21.1022 31.0007 21.5V33.5ZM31.0007 11H19.0007V9.5C19.0012 9.10233 19.1594 8.72109 19.4406 8.43989C19.7218 8.15869 20.1031 8.0005 20.5007 8H29.5007C29.8984 8.0005 30.2797 8.15869 30.5609 8.43989C30.8421 8.72109 31.0003 9.10233 31.0007 9.5V11Z"
              />
            </svg>
          </button>
        </div>
        <div
          v-else
          class="flex items-center space-x-1"
        >
          <span class="text-xs text-blue-400">当前页面未收藏</span>
          <button
            title="add bookmark"
            class="p-1 h-center bg-green-400 hover:bg-green-600 text-white rounded-sm"
            @click="changePage('edit')"
          >
            <svg
              class="w-3 h-3"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M45 25C45 25.442 44.8244 25.866 44.5118 26.1785C44.1993 26.4911 43.7754 26.6667 43.3333 26.6667H26.6667V43.3333C26.6667 43.7754 26.4911 44.1993 26.1785 44.5118C25.866 44.8244 25.442 45 25 45C24.558 45 24.134 44.8244 23.8215 44.5118C23.5089 44.1993 23.3333 43.7754 23.3333 43.3333V26.6667H6.66667C6.22464 26.6667 5.80072 26.4911 5.48816 26.1785C5.1756 25.866 5 25.442 5 25C5 24.558 5.1756 24.134 5.48816 23.8215C5.80072 23.5089 6.22464 23.3333 6.66667 23.3333H23.3333V6.66667C23.3333 6.22464 23.5089 5.80072 23.8215 5.48816C24.134 5.1756 24.558 5 25 5C25.442 5 25.866 5.1756 26.1785 5.48816C26.4911 5.80072 26.6667 6.22464 26.6667 6.66667V23.3333H43.3333C43.7754 23.3333 44.1993 23.5089 44.5118 23.8215C44.8244 24.134 45 24.558 45 25Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <PromptModal
      v-if="showDeleteConfirmModal"
      v-model:show="showDeleteConfirmModal"
      @result="getDeleteResult"
    >
      <template #title>
        <h2 class="p-4 text-sm font-bold">
          删除当前书签
        </h2>
      </template>
      <template #msg>
        <p class="p-2 text-xs text-center">
          该操作不可恢复
        </p>
      </template>
    </PromptModal>
    <PopupMsg
      v-if="showFinishMsgPopup"
      v-model:show="showFinishMsgPopup"
    >
      <template #msg>
        <p
          class="p-4 text-sm font-bold"
          :class="{
            'text-green-400': finishMsg === '删除成功',
            'text-red-400': finishMsg === '删除失败'
          }"
        >
          {{ finishMsg }}
        </p>
      </template>
    </PopupMsg>
  </footer>
</template>
<script>
import {
  ref, watch, inject, onMounted,
} from 'vue';
import PromptModal from '../Modal/PromptModal.vue';
import PopupMsg from '../Modal/PopupMsg.vue';
import useBookmark from '@/composables/useBookmark';
import useTab from '@/composables/useTab';
import useWebDAV from '@/composables/useWebDAV';

export default {
  components: {
    PromptModal,
    PopupMsg,
  },
  props: {
    browserType: {
      type: String,
      default: 'all',
    },
    bookmarkOpenMode: {
      type: String,
      default: 'single',
    },
    singleTab: {
      type: String,
      default: 'new',
    },
    multiOnGroup: Boolean,
    groupType: {
      type: String,
      default: 'new',
    },
    newGroupName: {
      type: String,
      default: 'new',
    },
    newGroupColor: {
      type: String,
      default: 'blue',
    },
    currentGroupId: {
      type: Number,
      default: NaN,
    },
  },
  emits: [
    'change-bookmark-open-mode',
    'update:singleTab',
    'update:multiOnGroup',
    'update:groupType',
    'update:newGroupName',
    'set-new-group-color',
    'update:current-group-id',
  ],
  setup(props, context) {
    const {
      getActiveTab, createNewTab, getAllTabGroups, watchTabGroups, createTabInGroup,
    } = useTab();

    const { deleteBookmark } = useBookmark();

    /**
     * open bookmarks setting
     */

    // group
    // old groups
    const oldGroups = ref([]);
    const showOldGroups = ref(false);

    const getOldGroups = async () => {
      const tabGroups = await getAllTabGroups();
      oldGroups.value = tabGroups;
    };

    getOldGroups();
    watchTabGroups(getOldGroups);

    const currentGroup = ref({});
    const setCurrentGroupIdHandler = (group) => {
      context.emit('update:current-group-id', group.id);
      showOldGroups.value = false;
    };

    watch(
      () => props.currentGroupId,
      async () => {
        if (!props.currentGroupId) return;
        await getOldGroups();
        const group = oldGroups.value.find((item) => item.id === props.currentGroupId);
        if (group) currentGroup.value = group;
      },
      {
        immediate: true,
      },
    );

    // new group
    const showColorPalette = ref(false);
    // group color scheme
    const colorScheme = [
      {
        name: 'grey',
        value: '#5F6368',
      },
      {
        name: 'blue',
        value: '#1A73E8',
      },
      {
        name: 'red',
        value: '#D93025',
      },
      {
        name: 'yellow',
        value: '#E37400',
      },
      {
        name: 'green',
        value: '#188038',
      },
      {
        name: 'pink',
        value: '#D01884',
      },
      {
        name: 'purple',
        value: '#9334E6',
      },
      {
        name: 'cyan',
        value: '#007B83',
      },
    ];

    const colorMap = (name) => {
      const item = colorScheme.find((color) => color.name === name);
      if (item) { return item.value; }
      return name;
    };

    function setGroupColorHandler(value) {
      context.emit('set-new-group-color', value);
      showColorPalette.value = false;
    }

    /**
     * edit bookmark
    */
    // bookmark state
    const currentBookmarkState = ref(false);
    // const bookmarkState = inject('bookmarkState');
    // currentBookmarkState.value = bookmarkState.value;
    // console.log('bookmarkState', bookmarkState);
    // console.log('currentBookmarkState', currentBookmarkState.value);

    /**
     * sync webDAV
     */
    const {
      setWebDAVInfo, getWebDAVInfo, clearWebDAVInfo, setWebDAVSync, getWebDAVSync, getWebDAVLastFileState, createWebDAVClient, checkWebDAVConnect, getWebDAVFolder, getWebDAVFile, writeWebDAVFile,
    } = useWebDAV();

    const webDAVSync = ref('manual');
    onMounted(async () => {
      webDAVSync.value = await getWebDAVSync();
    });

    const syncWebDAV = inject('syncWebDAV');

    // delete bookmark
    const showDeleteConfirmModal = ref(false);
    let currentBookmarkId = '';

    const deleteBookmarkHandler = () => {
      chrome.storage.local.get('currentBookmarkId', (result) => {
        if (result) currentBookmarkId = result.currentBookmarkId;
        if (currentBookmarkId) {
          showDeleteConfirmModal.value = true;
        }
      });
    };

    const finishMsg = ref('');
    const showFinishMsgPopup = ref(false);

    const setBookmarkState = inject('setBookmarkState');

    const getDeleteResult = (value) => {
      if (value && currentBookmarkId) {
        deleteBookmark(currentBookmarkId).then(() => {
          showFinishMsgPopup.value = true;
          finishMsg.value = '删除成功';
          let timer = setTimeout(() => {
            showFinishMsgPopup.value = false;
            currentBookmarkState.value = false;
            setBookmarkState(false);
            timer = null;
          }, 800);
          if (webDAVSync.value === 'auto') {
            syncWebDAV();
          }
        }).catch((err) => {
          showFinishMsgPopup.value = true;
          finishMsg.value = '删除失败';
          let timer = setTimeout(() => {
            showFinishMsgPopup.value = false;
            timer = null;
            console.log(err);
          }, 800);
        });
      }
    };

    // bookmark favicon
    // wait for a new api for favicon
    // refer to: https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/#other-features
    const favicon = ref('/icons/icon64_untag.png');

    // get tab bookmark state
    getActiveTab().then(async (tab) => {
      const currentTabUrl = tab.url || tab.pendingUrl;
      // get bookmark node
      const nodes = await chrome.bookmarks.search({
        url: currentTabUrl,
      });

      if (nodes.length > 0) {
        currentBookmarkState.value = true;
      }

      // favicon
      const { favIconUrl } = tab;
      if (favIconUrl) {
        favicon.value = favIconUrl;
      } else if (currentBookmarkState.value) {
        favicon.value = '/icons/icon64_tag.png';
      }
    });

    const changePage = inject('changePage');

    return {
      currentGroup,
      showOldGroups,
      oldGroups,
      setCurrentGroupIdHandler,
      showColorPalette,
      colorScheme,
      colorMap,
      setGroupColorHandler,
      favicon,
      currentBookmarkState,
      showDeleteConfirmModal,
      deleteBookmarkHandler,
      finishMsg,
      showFinishMsgPopup,
      getDeleteResult,
      changePage,
    };
  },
};
</script>
<style lang="css" scoped>
.h-center {
  @apply flex justify-center items-center;
}

.edit-bookmark-btn:hover::before {
  content: "";
  transform: scale(1.05);
  background-color: #d1d5db;
  background-size: cover;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 0.25rem;
}
</style>
