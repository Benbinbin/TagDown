<template>
  <div class="flex flex-col rounded-t-2xl">
    <header class="w-full p-4 flex justify-between items-center rounded-t-2xl">
      <button
        title="cancel"
        class="px-2 py-1 text-xs text-white bg-red-400 hover:bg-red-600 rounded"
        @click="finishFolder('cancel')"
      >
        取消
      </button>

      <h2 class="text-gray-600 text-base">
        选择文件夹
      </h2>
      <button
        title="save"
        class="px-2 py-1 text-xs text-white bg-green-400 hover:bg-green-600 rounded"
        @click="finishFolder('save')"
      >
        完成
      </button>
    </header>
    <div class="w-full px-4 py-2 bg-white border-b border-gray-200">
      <button
        title="expand folders to show the candidate folder location"
        class="w-full px-2 py-1 text-left text-gray-800 border border-gray-300 rounded"
        :disabled="!candidateFolder"
        @click="showCandidateFolderHandler"
      >
        {{ candidateFolder ? candidateFolder.title : '请选择文件夹' }}
      </button>
    </div>
    <div class="px-4 py-2 flex items-center space-x-2">
      <button
        title="back to parent folder"
        class="p-1 flex items-center bg-gray-100 text-gray-600 hover:bg-gray-200 space-x-0.5 rounded"
        @click="setCurrentNodeIdHandler('parent')"
      >
        <svg
          class="w-4 h-4"
          viewBox="0 0 50 50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4246 16.5607C11.6966 16.8419 12.0654 16.9999 12.45 16.9999C12.8345 16.9999 13.2033 16.8419 13.4753 16.5607L19.7 10.1212V24.5C19.7056 29.6699 21.6934 34.6264 25.2273 38.2821C28.7611 41.9378 33.5524 43.9941 38.55 44C38.9346 44 39.3034 43.842 39.5753 43.5607C39.8472 43.2794 40 42.8978 40 42.5C40 42.1022 39.8472 41.7206 39.5753 41.4393C39.3034 41.158 38.9346 41 38.55 41C34.3213 40.995 30.2671 39.2551 27.2769 36.1618C24.2868 33.0685 22.6048 28.8745 22.6 24.5V10.1212L28.8247 16.5607C29.0966 16.842 29.4654 17 29.85 17C30.2346 17 30.6034 16.842 30.8753 16.5607C31.1473 16.2794 31.3 15.8978 31.3 15.5C31.3 15.1022 31.1473 14.7206 30.8753 14.4393L22.1753 5.43931C22.1657 5.42938 22.1552 5.42075 22.1452 5.41119C22.1206 5.387 22.0959 5.36281 22.0696 5.3405C22.0508 5.32438 22.0309 5.3105 22.0115 5.2955C21.9928 5.28106 21.9749 5.26625 21.9556 5.25294C21.9341 5.23813 21.912 5.22519 21.8898 5.21169C21.8712 5.20006 21.8529 5.18787 21.8337 5.17719C21.8121 5.16537 21.7902 5.15544 21.7682 5.14475C21.747 5.13444 21.7262 5.12356 21.7046 5.11419C21.6841 5.10537 21.6633 5.09844 21.6426 5.09075C21.6185 5.08175 21.5948 5.07219 21.5701 5.0645C21.5504 5.05831 21.5302 5.05381 21.5103 5.04856C21.4844 5.04181 21.4588 5.03431 21.4326 5.02887C21.4106 5.02437 21.3883 5.02194 21.3662 5.01856C21.3416 5.01481 21.3173 5.00994 21.2921 5.00731C21.2555 5.00375 21.2189 5.00244 21.1821 5.00169C21.1712 5.0015 21.1609 5 21.15 5C21.1391 5 21.1288 5.0015 21.1179 5.00169C21.0811 5.00244 21.0445 5.00375 21.0079 5.00731C20.9829 5.00994 20.9584 5.01481 20.9339 5.01856C20.9116 5.02194 20.8895 5.02437 20.8674 5.02887C20.8411 5.0345 20.8156 5.04181 20.7898 5.04856C20.7699 5.05381 20.7496 5.05831 20.7297 5.0645C20.7052 5.07219 20.6815 5.08175 20.6573 5.09075C20.6367 5.09825 20.6158 5.10537 20.5954 5.11419C20.5736 5.12356 20.5529 5.13444 20.5319 5.14475C20.51 5.15544 20.4879 5.16537 20.4665 5.17719C20.4471 5.18787 20.4288 5.20006 20.4101 5.21169C20.388 5.22519 20.3659 5.23813 20.3445 5.25294C20.3253 5.26625 20.3072 5.28106 20.2887 5.2955C20.2691 5.3105 20.2492 5.32438 20.2303 5.3405C20.204 5.36281 20.1796 5.387 20.1547 5.41119C20.1448 5.42075 20.1343 5.42938 20.1247 5.43931L11.4246 14.4393C11.1527 14.7206 11 15.1022 11 15.5C11 15.8978 11.1527 16.2794 11.4246 16.5607Z"
          />
        </svg>
        <span class="text-xs">上一级</span>
      </button>
      <button
        title="back to root folder"
        class="p-1 flex items-center bg-gray-100 text-gray-600 hover:bg-gray-200 space-x-0.5 rounded"
        @click="setCurrentNodeIdHandler('root')"
      >
        <svg
          class="w-4 h-4"
          viewBox="0 0 50 50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45 12.501C45.0003 11.0892 44.6021 9.70596 43.851 8.51043C43.1 7.3149 42.0268 6.35563 40.7547 5.74296C39.4827 5.13028 38.0635 4.8891 36.6604 5.04714C35.2574 5.20518 33.9274 5.75603 32.8236 6.63633C31.7197 7.51663 30.8868 8.69062 30.4206 10.0233C29.9544 11.3559 29.8739 12.793 30.1883 14.1694C30.5028 15.5458 31.1994 16.8054 32.198 17.8035C33.1966 18.8015 34.4567 19.4974 35.8333 19.8112V20.0003C35.8323 20.884 35.4808 21.7312 34.8559 22.3561C34.231 22.9809 33.3838 23.3324 32.5 23.3334L17.5 23.3338C16.616 23.3338 15.7681 22.9826 15.143 22.3576C14.5179 21.7325 14.1667 20.8847 14.1667 20.0008V19.8112C15.9645 19.4015 17.5484 18.3439 18.6157 16.8404C19.6831 15.337 20.1592 13.493 19.953 11.6608C19.7468 9.82864 18.8728 8.13659 17.498 6.9079C16.1232 5.67922 14.3439 5 12.5 5C10.6561 5 8.8768 5.67922 7.50199 6.9079C6.12718 8.13659 5.25322 9.82864 5.04705 11.6608C4.84088 13.493 5.31694 15.337 6.38431 16.8404C7.45168 18.3439 9.03554 19.4015 10.8333 19.8112V20.0008C10.8333 21.7687 11.5357 23.4643 12.786 24.7144C14.0362 25.9645 15.7319 26.6668 17.5 26.6668L23.3338 26.6666L23.3333 30.1888C21.5355 30.5985 19.9517 31.6561 18.8843 33.1596C17.8169 34.663 17.3409 36.507 17.547 38.3392C17.7532 40.1714 18.6272 41.8634 20.002 43.0921C21.3768 44.3208 23.1561 45 25 45C26.8439 45 28.6232 44.3208 29.998 43.0921C31.3728 41.8634 32.2468 40.1714 32.453 38.3392C32.6592 36.507 32.1831 34.663 31.1157 33.1596C30.0483 31.6561 28.4645 30.5985 26.6667 30.1888L26.6669 26.6666H32.5002C34.2676 26.6645 35.9621 25.9615 37.2118 24.7118C38.4615 23.4621 39.1645 21.7678 39.1665 20.0005V19.8112C40.8222 19.4317 42.3004 18.5023 43.3598 17.1747C44.4192 15.847 44.9974 14.1995 44.9998 12.501H45ZM8.33335 12.501C8.33335 11.677 8.57772 10.8715 9.03556 10.1863C9.4934 9.50117 10.1441 8.96716 10.9055 8.65183C11.6669 8.33649 12.5046 8.25398 13.3129 8.41474C14.1211 8.5755 14.8636 8.9723 15.4463 9.55497C16.029 10.1376 16.4258 10.88 16.5866 11.6882C16.7474 12.4964 16.6649 13.3341 16.3495 14.0954C16.0341 14.8567 15.5001 15.5073 14.8149 15.9651C14.1297 16.4229 13.3241 16.6673 12.5 16.6673C11.3953 16.666 10.3363 16.2267 9.55514 15.4456C8.77401 14.6646 8.33462 13.6056 8.33335 12.501ZM29.1667 37.4992C29.1667 38.3232 28.9223 39.1288 28.4645 39.8139C28.0066 40.499 27.3559 41.0331 26.5945 41.3484C25.8332 41.6637 24.9954 41.7462 24.1871 41.5855C23.3789 41.4247 22.6364 41.0279 22.0537 40.4452C21.471 39.8626 21.0742 39.1202 20.9134 38.312C20.7526 37.5038 20.8351 36.6661 21.1505 35.9049C21.4659 35.1436 21.9999 34.4929 22.6851 34.0351C23.3703 33.5773 24.1759 33.3329 25 33.3329C26.1047 33.3341 27.1638 33.7735 27.9449 34.5545C28.7261 35.3356 29.1655 36.3946 29.1667 37.4992ZM37.5 16.6673C36.6759 16.6673 35.8703 16.4229 35.1851 15.9651C34.4999 15.5073 33.9659 14.8567 33.6505 14.0954C33.3351 13.3341 33.2526 12.4964 33.4134 11.6882C33.5742 10.88 33.971 10.1376 34.5537 9.55497C35.1364 8.9723 35.8789 8.5755 36.6871 8.41474C37.4954 8.25398 38.3332 8.33649 39.0945 8.65183C39.8559 8.96716 40.5066 9.50117 40.9645 10.1863C41.4223 10.8715 41.6667 11.677 41.6667 12.501C41.6654 13.6056 41.226 14.6646 40.4449 15.4456C39.6638 16.2267 38.6047 16.666 37.5 16.6673Z"
          />
        </svg>
        <span class="text-xs">根目录</span>
      </button>
    </div>
    <div class="main-wrapper overflow-auto w-full h-full p-4">
      <FolderItem
        :node="currentNode"
        :show-children-init="true"
        @expand-folder="expandFolderHandler"
      />
    </div>

    <PopupMenu
      v-if="showPopupMenu"
      v-model:show="showPopupMenu"
      :left="menuLeft"
      :top="menuTop"
      :menu-width="140"
      :menu-height="95"
    >
      <button
        title="add subfolder"
        class="menu-btn-style text-gray-600 hover:text-yellow-600 hover:bg-yellow-50"
        @click="addSubfolderHandler"
      >
        <div class="menu-icon-style text-yellow-400 border-yellow-400">
          <svg
            class="w-3 h-3"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.9231 14.1818H25.6373L20.3846 8.90545C20.0996 8.61753 19.7605 8.38926 19.3871 8.23384C19.0137 8.07842 18.6133 7.99895 18.209 8.00001H8.07692C7.26115 8.00093 6.47906 8.32688 5.90222 8.90633C5.32539 9.48579 5.00092 10.2714 5 11.0909V39.0279C5.00087 39.8159 5.31286 40.5713 5.86753 41.1285C6.42219 41.6857 7.17424 41.9991 7.95865 42H42.094C42.8645 41.9991 43.6031 41.6913 44.1479 41.144C44.6927 40.5968 44.9991 39.8548 45 39.0808V17.2727C44.9991 16.4533 44.6746 15.6676 44.0978 15.0881C43.5209 14.5087 42.7388 14.1827 41.9231 14.1818ZM18.209 11.0909L21.2858 14.1818H8.07692V11.0909H18.209ZM41.9231 38.9091H8.07692V17.2727H41.9231V38.9091ZM25 21.9091C25.408 21.9091 25.7993 22.0719 26.0879 22.3617C26.3764 22.6516 26.5385 23.0447 26.5385 23.4546V26.5455H29.6154C30.0234 26.5455 30.4147 26.7083 30.7032 26.9981C30.9918 27.2879 31.1538 27.681 31.1538 28.0909C31.1538 28.5008 30.9918 28.8939 30.7032 29.1837C30.4147 29.4735 30.0234 29.6364 29.6154 29.6364H26.5385V32.7273C26.5385 33.1372 26.3764 33.5302 26.0879 33.8201C25.7993 34.1099 25.408 34.2727 25 34.2727C24.592 34.2727 24.2007 34.1099 23.9121 33.8201C23.6236 33.5302 23.4615 33.1372 23.4615 32.7273V29.6364H20.3846C19.9766 29.6364 19.5853 29.4735 19.2968 29.1837C19.0082 28.8939 18.8462 28.5008 18.8462 28.0909C18.8462 27.681 19.0082 27.2879 19.2968 26.9981C19.5853 26.7083 19.9766 26.5455 20.3846 26.5455H23.4615V23.4546C23.4615 23.0447 23.6236 22.6516 23.9121 22.3617C24.2007 22.0719 24.592 21.9091 25 21.9091Z"
            />
          </svg>
        </div>
        <span class="text-xs">新增子文件夹</span>
      </button>
      <button
        title="rename folder"
        class="menu-btn-style text-gray-600 hover:text-blue-600 hover:bg-blue-50"
        @click="renameFolderHandler"
      >
        <div class="menu-icon-style text-blue-400 border-blue-400">
          <svg
            class="w-3 h-3"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.0724 14.79L34.2112 5.92926C33.9166 5.63465 33.5669 5.40095 33.1819 5.24151C32.797 5.08206 32.3845 5 31.9678 5C31.5512 5 31.1386 5.08206 30.7537 5.24151C30.3688 5.40095 30.019 5.63465 29.7244 5.92926L24.501 11.1525V11.1527L24.5006 11.1529L5.92941 29.7235C5.63386 30.0173 5.39953 30.3669 5.24 30.752C5.08047 31.137 4.9989 31.5499 5.00001 31.9667V40.8274C5.00096 41.6686 5.33552 42.475 5.93032 43.0697C6.52511 43.6645 7.33155 43.9991 8.17271 44H17.6908C17.8991 44 18.1054 43.959 18.2979 43.8793C18.4903 43.7996 18.6652 43.6827 18.8125 43.5354L43.0724 19.2764C43.6664 18.681 44 17.8743 44 17.0332C44 16.1922 43.6664 15.3854 43.0724 14.79ZM17.0338 40.8274H8.17271V31.9667L25.6225 14.5176L34.4837 23.3783L17.0338 40.8274ZM36.727 21.1351L27.866 12.2744L31.9679 8.17246L40.8291 17.0332L36.727 21.1351Z"
            />
          </svg>
        </div>
        <span class="text-xs">重命名文件夹</span>
      </button>
      <button
        title="delete folder"
        class="w-full p-1 flex items-center space-x-1 rounded text-red-400 hover:bg-red-400 hover:text-white"
        @click="deleteItemHandler"
      >
        <div class="menu-icon-style border-red-400">
          <svg
            class="w-3 h-3"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.5 11H34.0007V9.5C33.9994 8.30694 33.5249 7.16312 32.6813 6.3195C31.8376 5.47588 30.6938 5.00134 29.5007 5H20.5007C19.3077 5.00134 18.1639 5.47588 17.3202 6.3195C16.4766 7.16312 16.0021 8.30694 16.0007 9.5V11H8.5C8.10217 11 7.72064 11.158 7.43934 11.4393C7.15804 11.7206 7 12.1022 7 12.5C7 12.8978 7.15804 13.2794 7.43934 13.5607C7.72064 13.842 8.10217 14 8.5 14H10V41C10.0009 41.7954 10.3173 42.5579 10.8797 43.1203C11.4421 43.6827 12.2046 43.9991 13 44H37C37.7954 43.9991 38.5579 43.6827 39.1203 43.1203C39.6827 42.5579 39.9991 41.7954 40 41V14H41.5C41.8978 14 42.2794 13.842 42.5607 13.5607C42.842 13.2794 43 12.8978 43 12.5C43 12.1022 42.842 11.7206 42.5607 11.4393C42.2794 11.158 41.8978 11 41.5 11ZM19.0007 9.5C19.0012 9.10233 19.1594 8.72109 19.4406 8.43989C19.7218 8.15869 20.1031 8.0005 20.5007 8H29.5007C29.8984 8.0005 30.2797 8.15869 30.5609 8.43989C30.8421 8.72109 31.0003 9.10233 31.0007 9.5V11H19.0007V9.5ZM37 41H13V14H37V41ZM22.0007 21.5V33.5C22.0007 33.8978 21.8427 34.2794 21.5614 34.5607C21.2801 34.842 20.8986 35 20.5007 35C20.1029 35 19.7214 34.842 19.4401 34.5607C19.1588 34.2794 19.0007 33.8978 19.0007 33.5V21.5C19.0007 21.1022 19.1588 20.7206 19.4401 20.4393C19.7214 20.158 20.1029 20 20.5007 20C20.8986 20 21.2801 20.158 21.5614 20.4393C21.8427 20.7206 22.0007 21.1022 22.0007 21.5ZM31.0007 21.5V33.5C31.0007 33.8978 30.8427 34.2794 30.5614 34.5607C30.2801 34.842 29.8986 35 29.5007 35C29.1029 35 28.7214 34.842 28.4401 34.5607C28.1588 34.2794 28.0007 33.8978 28.0007 33.5V21.5C28.0007 21.1022 28.1588 20.7206 28.4401 20.4393C28.7214 20.158 29.1029 20 29.5007 20C29.8986 20 30.2801 20.158 30.5614 20.4393C30.8427 20.7206 31.0007 21.1022 31.0007 21.5Z"
            />
          </svg>
        </div>
        <span class="text-xs">删除文件夹和书签</span>
      </button>
    </PopupMenu>
    <PromptModal
      v-if="showConfirmDeleteModal"
      v-model:show="showConfirmDeleteModal"
      @result="getResultHandler"
    >
      <template #title>
        <h2 class="p-4 text-sm font-bold">
          是否删除该文件夹及其书签
        </h2>
      </template>
      <template #msg>
        <p class="p-2 text-xs text-center">
          folder1
        </p>
      </template>
      <template #btn="{ resultHandler }">
        <div class="p-2 all-center space-x-2">
          <button
            class="p-1 text-white bg-red-400 hover:bg-red-600 rounded"
            @click="resultHandler(true)"
          >
            确定
          </button>
          <button
            class="p-1 text-white bg-green-400 hover:bg-green-600 rounded"
            @click="resultHandler(false)"
          >
            取消
          </button>
        </div>
      </template>
    </PromptModal>
    <InputModal
      v-if="showRenameFolderModal"
      v-model:show="showRenameFolderModal"
      :init-value="initFolderName"
      :placeholder="'请输入文件夹名称'"
      @result="getRenameResultHandler"
    >
      <template #title>
        <label
          for="input-modal"
          class="block p-4 text-sm text-center font-bold"
        >重命名文件夹</label>
      </template>
    </InputModal>
    <InputModal
      v-if="showAddSubfolderModal"
      v-model:show="showAddSubfolderModal"
      :placeholder="'请输入子文件夹名称'"
      @result="getSubfolderNameHandler"
    >
      <template #title>
        <label
          for="input-modal"
          class="block p-4 text-sm text-center font-bold"
        >新增子文件夹</label>
      </template>
    </InputModal>
    <transition name="dissolve">
      <PopupHint
        v-if="showPopupHint"
        @enter-popup="enterPopupHintHandler"
        @leave-popup="leavePopupHintHandler"
      >
        <ul>
          <li
            v-for="hint of hintContent"
            :key="hint.id"
            class="flex items-center"
          >
            <div
              v-if="!hint.children"
              class="flex-shrink-0 p-1 text-gray-400"
            >
              <svg
                class="w-4 h-4"
                viewBox="0 0 50 50"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M35.8889 5H14.1111C13.2863 5.00093 12.4955 5.32994 11.9122 5.91485C11.329 6.49977 11.0009 7.29281 11 8.12V42.44C11 42.7185 11.0743 42.9919 11.2153 43.2318C11.3562 43.4717 11.5586 43.6694 11.8015 43.8044C12.0443 43.9394 12.3188 44.0068 12.5964 43.9995C12.874 43.9921 13.1445 43.9105 13.38 43.7629L24.9986 36.4796L36.62 43.7629C36.8555 43.9105 37.126 43.9921 37.4036 43.9995C37.6812 44.0068 37.9557 43.9394 38.1985 43.8044C38.4414 43.6694 38.6438 43.4717 38.7847 43.2318C38.9257 42.9919 39 42.7185 39 42.44V8.12C38.9991 7.29281 38.671 6.49977 38.0878 5.91485C37.5045 5.32994 36.7137 5.00093 35.8889 5ZM35.8889 39.6256L25.8229 33.3171C25.5757 33.1622 25.29 33.08 24.9984 33.08C24.7069 33.08 24.4212 33.1622 24.174 33.3171L14.1111 39.6254V8.12H35.8889V39.6256Z"
                />
              </svg>
            </div>
            <div
              v-else
              class="flex-shrink-0 p-1 text-yellow-400"
            >
              <svg
                class="w-4 h-4"
                viewBox="0 0 50 50"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M41 14H25.1212L20 8.87901C19.7222 8.5995 19.3916 8.37788 19.0276 8.227C18.6635 8.07612 18.2731 7.99896 17.879 8.00001H8C7.20459 8.0008 6.44199 8.31713 5.87956 8.87957C5.31712 9.442 5.00079 10.2046 5 11V38.1157C5.00104 38.8806 5.30544 39.6138 5.84641 40.1545C6.38738 40.6952 7.12075 40.9993 7.88562 41H41.1669C41.918 40.999 42.638 40.7002 43.1691 40.1691C43.7002 39.638 43.999 38.918 44 38.1669V17.0002C43.9992 16.2048 43.6829 15.4422 43.1204 14.8798C42.558 14.3173 41.7954 14.001 41 14.0002V14ZM8 11H17.879L20.879 14H8V11Z"
                />
              </svg>
            </div>
            <span>{{ hint.title }}</span>
          </li>
        </ul>
      </PopupHint>
    </transition>
  </div>
</template>
<script>
import {
  ref, watch, provide,
} from 'vue';
import FolderItem from './FolderItem.vue';
import PromptModal from '../Modal/PromptModal.vue';
import PopupMenu from '../Modal/PopupMenu.vue';
import InputModal from '../Modal/InputModal.vue';
import PopupHint from '../Modal/PopupHint.vue';
import useFolder from '@/composables/useFolder';

export default {
  components: {
    FolderItem,
    PromptModal,
    PopupMenu,
    InputModal,
    PopupHint,
  },
  props: {
    selectFolder: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ['cancel-folder', 'save-folder'],
  setup(props, context) {
    // current node
    const currentNodeId = ref('0');
    if (props.selectFolder.parentId) {
      currentNodeId.value = props.selectFolder.parentId;
    }
    // watch current node id to update the current node and children nodes
    const currentNode = ref(null);
    watch(
      currentNodeId,
      (newValue, oldValue) => {
        chrome.bookmarks.getSubTree(currentNodeId.value).then((nodes) => {
          [currentNode.value] = nodes;
        });
      },
      {
        immediate: true,
      },
    );

    const setCurrentNodeIdHandler = (value) => {
      console.log(currentNode.value);
      if (value === 'parent' && currentNode.value.parentId) {
        currentNodeId.value = currentNode.value.parentId;
      } else if (value === 'root') {
        currentNodeId.value = '0';
      }
    };

    provide('setCurrentNodeIdHandler', setCurrentNodeIdHandler);

    // candidate folder
    const candidateFolder = ref(props.selectFolder);
    provide('candidateFolder', candidateFolder);

    const setCandidateFolderHandler = (node) => {
      candidateFolder.value = node;
    };
    provide('setCandidateFolderHandler', setCandidateFolderHandler);

    const showCandidateFolder = ref(false);
    provide('showCandidateFolder', showCandidateFolder);

    const showCandidateFolderHandler = () => {
      showCandidateFolder.value = true;
    };

    const expandFolderHandler = () => {
      showCandidateFolder.value = false;
    };

    const finishFolder = (value) => {
      if (value === 'cancel') {
        context.emit('cancel-folder');
      } else {
        context.emit('save-folder', candidateFolder.value);
      }
    };

    /**
     * modal
     */

    // popup menu
    // show state and location
    const showPopupMenu = ref(false);
    const menuLeft = ref(0);
    const menuTop = ref(0);
    const selectItem = ref('');

    const showPopupMenuHandler = (value, event) => {
      const target = event.currentTarget;
      if (!target) return;
      selectItem.value = value;
      menuLeft.value = event.clientX;
      menuTop.value = event.clientY;
      showPopupMenu.value = true;
    };

    provide('showPopupMenuHandler', showPopupMenuHandler);

    // popup hint
    // show state and location
    const showPopupHint = ref(false);
    const hintContent = ref([]);

    const showPopupHintHandler = (target) => {
      hintContent.value = target.children;
      if (hintContent.value && hintContent.value.length > 0) {
        showPopupHint.value = true;
      }
    };

    provide('showPopupHintHandler', showPopupHintHandler);

    let hiddenTimmer = null;
    const hidePopupHintHandler = () => {
      hiddenTimmer = setTimeout(() => {
        showPopupHint.value = false;
        hintContent.value = [];
      }, 600);
    };

    provide('hidePopupHintHandler', hidePopupHintHandler);

    const enterPopupHintHandler = () => {
      if (hiddenTimmer) clearTimeout(hiddenTimmer);
    };

    const leavePopupHintHandler = () => {
      hiddenTimmer = setTimeout(() => {
        showPopupHint.value = false;
      }, 600);
    };

    const { createFolder, renameFolder, deleteFolder } = useFolder();

    // rename folder
    const initFolderName = ref('');
    const showRenameFolderModal = ref(false);
    const renameFolderHandler = () => {
      initFolderName.value = selectItem.value.title;
      showRenameFolderModal.value = true;
      showPopupMenu.value = false;
    };
    const getRenameResultHandler = async (obj) => {
      if (obj.state && selectItem.value) {
        await renameFolder(selectItem.value.id, obj.value);
        chrome.bookmarks.getSubTree(currentNodeId.value).then((nodes) => {
          [currentNode.value] = nodes;
        });
      }
      showRenameFolderModal.value = false;
    };

    // add subfolder
    const showAddSubfolderModal = ref(false);
    const addSubfolderHandler = () => {
      showAddSubfolderModal.value = true;
      showPopupMenu.value = false;
    };
    const getSubfolderNameHandler = async (obj) => {
      console.log(obj);
      console.log(selectItem.value);
      if (obj.state && selectItem.value) {
        await createFolder(selectItem.value.id, obj.value);
        chrome.bookmarks.getSubTree(currentNodeId.value).then((nodes) => {
          [currentNode.value] = nodes;
        });
      }
      showRenameFolderModal.value = false;
    };

    // delete folder
    const showConfirmDeleteModal = ref(false);
    const deleteItemHandler = () => {
      showConfirmDeleteModal.value = true;
      showPopupMenu.value = false;
    };
    const getResultHandlerd = (value) => {
      console.log(value);
    };

    return {
      currentNodeId,
      currentNode,
      setCurrentNodeIdHandler,
      candidateFolder,
      showCandidateFolderHandler,
      expandFolderHandler,
      finishFolder,
      showPopupMenu,
      menuLeft,
      menuTop,
      showPopupMenuHandler,
      selectItem,
      showPopupHint,
      hintContent,
      showPopupHintHandler,
      hidePopupHintHandler,
      enterPopupHintHandler,
      leavePopupHintHandler,
      initFolderName,
      showRenameFolderModal,
      renameFolderHandler,
      getRenameResultHandler,
      showAddSubfolderModal,
      addSubfolderHandler,
      getSubfolderNameHandler,
      showConfirmDeleteModal,
      deleteItemHandler,
      getResultHandlerd,
    };
  },
};
</script>

<style lang="scss" scoped>
.all-center {
  @apply flex justify-center items-center;
}

.main-wrapper {
  overflow: overlay;
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #9ca3af;
    // border: 3px solid transparent;
    // background-clip: padding-box;
  }
}

.input-style {
  @apply w-full p-1 border border-gray-300 rounded;
}

.menu-btn-style {
  @apply w-full p-1 flex items-center space-x-1 rounded;
}

.menu-icon-style {
  @apply p-0.5 border rounded-sm;
}

// .menu-text-style {
//   @apply text-xs text-gray-600;
// }

.select-folders {
  min-height: 2rem;
  max-height: 5rem;
}

.dissolve-enter-from,
.dissolve-leave-to {
  opacity: 0;
}

.dissolve-enter-active,
.dissolve-leave-active {
  transition: opacity 300ms ease-in-out 500ms;
}
</style>
