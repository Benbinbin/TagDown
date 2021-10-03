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
      <div class="flex items-center text-gray-600 space-x-0.5">
        <button
          v-show="foldersMode === 'list'"
          title="show folders in tree mode"
          class="p-0.5 hover:bg-gray-200 rounded"
          @click="foldersMode = 'tree'"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.1481 22H42.037C42.8226 21.9991 43.5757 21.6827 44.1312 21.1203C44.6867 20.5579 44.9991 19.7954 45 19V10C44.9991 9.20462 44.6867 8.44208 44.1312 7.87967C43.5757 7.31725 42.8226 7.00089 42.037 7H33.1481C32.3626 7.00089 31.6095 7.31725 31.054 7.87967C30.4985 8.44208 30.1861 9.20462 30.1852 10V13H28.7037C27.1326 13.0018 25.6263 13.6345 24.5154 14.7593C23.4044 15.8842 22.7795 17.4092 22.7778 19V23.5H18.3333V21.25C18.3325 20.4546 18.02 19.6921 17.4645 19.1297C16.9091 18.5673 16.1559 18.2509 15.3704 18.25H7.96296C7.17741 18.2509 6.42428 18.5673 5.86881 19.1297C5.31333 19.6921 5.00088 20.4546 5 21.25V28.75C5.00088 29.5454 5.31333 30.3079 5.86881 30.8703C6.42428 31.4327 7.17741 31.7491 7.96296 31.75H15.3704C16.1559 31.7491 16.9091 31.4327 17.4645 30.8703C18.02 30.3079 18.3325 29.5454 18.3333 28.75V26.5H22.7778V31C22.7795 32.5907 23.4044 34.1158 24.5154 35.2407C25.6263 36.3655 27.1326 36.9982 28.7037 37H30.1852V40C30.1861 40.7954 30.4985 41.5579 31.054 42.1203C31.6095 42.6827 32.3626 42.9991 33.1481 43H42.037C42.8226 42.9991 43.5757 42.6827 44.1312 42.1203C44.6867 41.5579 44.9991 40.7954 45 40V31C44.9991 30.2046 44.6867 29.4421 44.1312 28.8797C43.5757 28.3173 42.8226 28.0009 42.037 28H33.1481C32.3626 28.0009 31.6095 28.3173 31.054 28.8797C30.4985 29.4421 30.1861 30.2046 30.1852 31V34H28.7037C27.9181 33.9991 27.165 33.6827 26.6095 33.1203C26.0541 32.5579 25.7416 31.7954 25.7407 31V19C25.7416 18.2046 26.0541 17.4421 26.6095 16.8797C27.165 16.3173 27.9181 16.0009 28.7037 16H30.1852V19C30.1861 19.7954 30.4985 20.5579 31.054 21.1203C31.6095 21.6827 32.3626 21.9991 33.1481 22ZM15.3704 28.75H7.96296V21.25H15.3704L15.3713 24.982C15.3713 24.988 15.3704 24.994 15.3704 25C15.3704 25.0062 15.3713 25.012 15.3713 25.0182L15.3722 28.75H15.3704ZM33.1481 31H42.037L42.0389 40H33.1481V31ZM33.1481 10H42.037L42.0389 19H33.1481V10Z"
            />
          </svg>
        </button>
        <button
          v-show="foldersMode === 'tree'"
          title="show folders in list mode"
          class="p-0.5 hover:bg-gray-200 rounded"
          @click="foldersMode = 'list'"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 11.5263C15 11.0796 15.1756 10.6513 15.4882 10.3354C15.8007 10.0195 16.2246 9.84211 16.6667 9.84211H43.3333C43.7754 9.84211 44.1993 10.0195 44.5118 10.3354C44.8244 10.6513 45 11.0796 45 11.5263C45 11.973 44.8244 12.4014 44.5118 12.7172C44.1993 13.0331 43.7754 13.2105 43.3333 13.2105H16.6667C16.2246 13.2105 15.8007 13.0331 15.4882 12.7172C15.1756 12.4014 15 11.973 15 11.5263ZM43.3333 23.3158H16.6679C16.2259 23.3158 15.802 23.4932 15.4894 23.8091C15.1768 24.1249 15.0013 24.5533 15.0013 25C15.0013 25.4467 15.1768 25.8751 15.4894 26.1909C15.802 26.5068 16.2259 26.6842 16.6679 26.6842H43.3333C43.7754 26.6842 44.1993 26.5068 44.5118 26.1909C44.8244 25.8751 45 25.4467 45 25C45 24.5533 44.8244 24.1249 44.5118 23.8091C44.1993 23.4932 43.7754 23.3158 43.3333 23.3158ZM43.3333 36.7895H16.6679C16.2259 36.7895 15.802 36.9669 15.4894 37.2828C15.1768 37.5986 15.0013 38.027 15.0013 38.4737C15.0013 38.9204 15.1768 39.3488 15.4894 39.6646C15.802 39.9805 16.2259 40.1579 16.6679 40.1579H43.3333C43.7754 40.1579 44.1993 39.9805 44.5118 39.6646C44.8244 39.3488 45 38.9204 45 38.4737C45 38.027 44.8244 37.5986 44.5118 37.2828C44.1993 36.9669 43.7754 36.7895 43.3333 36.7895ZM7.5 9C7.00555 9 6.5222 9.14817 6.11108 9.42576C5.69995 9.70336 5.37952 10.0979 5.1903 10.5595C5.00108 11.0212 4.95157 11.5291 5.04804 12.0192C5.1445 12.5092 5.3826 12.9594 5.73223 13.3127C6.08187 13.666 6.52732 13.9066 7.01228 14.0041C7.49723 14.1016 7.99989 14.0515 8.45671 13.8603C8.91352 13.6691 9.30397 13.3453 9.57867 12.9299C9.85338 12.5144 10 12.026 10 11.5263C10 10.8563 9.73661 10.2137 9.26777 9.73994C8.79893 9.26616 8.16304 9 7.5 9ZM7.5 22.4737C7.00555 22.4737 6.5222 22.6219 6.11108 22.8994C5.69995 23.177 5.37952 23.5716 5.1903 24.0332C5.00108 24.4948 4.95157 25.0028 5.04804 25.4929C5.1445 25.9829 5.3826 26.4331 5.73223 26.7864C6.08187 27.1397 6.52732 27.3803 7.01228 27.4778C7.49723 27.5753 7.99989 27.5252 8.45671 27.334C8.91352 27.1428 9.30397 26.819 9.57867 26.4035C9.85338 25.9881 10 25.4997 10 25C10 24.33 9.73661 23.6874 9.26777 23.2136C8.79893 22.7398 8.16304 22.4737 7.5 22.4737ZM7.5 35.9474C7.00555 35.9474 6.5222 36.0955 6.11108 36.3731C5.69995 36.6507 5.37952 37.0453 5.1903 37.5069C5.00108 37.9685 4.95157 38.4765 5.04804 38.9665C5.1445 39.4566 5.3826 39.9067 5.73223 40.2601C6.08187 40.6134 6.52732 40.854 7.01228 40.9515C7.49723 41.0489 7.99989 40.9989 8.45671 40.8077C8.91352 40.6165 9.30397 40.2927 9.57867 39.8772C9.85338 39.4618 10 38.9733 10 38.4737C10 37.8037 9.73661 37.1611 9.26777 36.6873C8.79893 36.2135 8.16304 35.9474 7.5 35.9474Z"
            />
          </svg>
        </button>
        <h2 class="text-base">
          选择文件夹
        </h2>
      </div>
      <button
        title="save"
        class="px-2 py-1 text-xs text-white bg-green-400 hover:bg-green-600 rounded"
        @click="finishFolder('save')"
      >
        完成
      </button>
    </header>
    <div class="w-full px-4 py-2 bg-white border-b border-gray-200">
      <button class="w-full px-2 py-1 text-left text-gray-800 border border-gray-300 rounded">
        {{ selectFolderCandidate }}
      </button>
    </div>
    <div class="px-4 py-2 flex items-center space-x-2">
      <button
        title="back to parent folder"
        class="p-1 flex items-center bg-gray-100 text-gray-600 hover:bg-gray-200 space-x-0.5 rounded"
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
      <div class="flex justify-end items-start">
        <div class="flex items-center space-x-0.5">
          <!-- triangle toggle button -->
          <button
            title="triangle toggle button"
            class="btn py-1 text-gray-600"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 7.72733V42.2727C15 42.6143 15.1026 42.9483 15.2949 43.2323C15.4872 43.5164 15.7605 43.7378 16.0803 43.8685C16.4001 43.9993 16.7519 44.0335 17.0914 43.9668C17.4309 43.9002 17.7427 43.7356 17.9875 43.4941L35.4874 26.2214C35.6499 26.061 35.7788 25.8706 35.8668 25.661C35.9547 25.4515 36 25.2268 36 25C36 24.7732 35.9547 24.5486 35.8668 24.339C35.7788 24.1294 35.6499 23.939 35.4874 23.7786L17.9875 6.50594C17.7427 6.26436 17.4309 6.09985 17.0914 6.03319C16.7519 5.96654 16.4001 6.00075 16.0803 6.13148C15.7605 6.26222 15.4872 6.48362 15.2949 6.76768C15.1026 7.05174 15 7.3857 15 7.72733Z"
              />
            </svg>
          </button>
          <!-- folder button -->
          <button
            title="folder button left click to select, right click to  show the more setting popup menu"
            class="btn p-1 flex items-center text-yellow-400 space-x-0.5"
            @click.right.prevent="showPopupMenuHandler('folder1', $event)"
            @mouseenter.ctrl="showPopupHintHandler('folder1', $event)"
            @mouseleave="hidePopupHintHandler"
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
            <span class="text-xs text-gray-600">folder1</span>
          </button>
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
            class="menu-btn-style text-gray-600 hover:text-yellow-600  hover:bg-yellow-50"
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
          :init-value="'folder_name'"
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
          :init-value="'subfolder_name'"
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
                :key="hint"
              >
                {{ hint }}
              </li>
            </ul>
          </PopupHint>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import PromptModal from '../Modal/PromptModal.vue';
import PopupMenu from '../Modal/PopupMenu.vue';
import InputModal from '../Modal/InputModal.vue';
import PopupHint from '../Modal/PopupHint.vue';

export default {
  components: {
    PromptModal,
    PopupMenu,
    InputModal,
    PopupHint,
  },
  props: {
    selectFolder: {
      type: String,
      default: '',
    },
  },
  emits: ['cancel-folder', 'save-folder'],
  setup(props, context) {
    const foldersMode = ref('list'); // list, tree

    const selectFolderCandidate = ref(props.selectFolder);
    const finishFolder = (value) => {
      if (value === 'cancel') {
        context.emit('cancel-folder');
      } else {
        context.emit('save-folder', 'another_folder');
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

    // popup hint
    // show state and location
    const showPopupHint = ref(false);
    const hintContent = ref([]);

    const showPopupHintHandler = (value, event) => {
      const target = event.currentTarget;
      if (!target) return;
      // hintContent.value = [value, 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag2', 'tag3', 'tag4', 'tag5', 'tag2', 'tag3', 'tag4', 'tag5'];
      hintContent.value = [value, 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', '这是一个很长的 bookmark 名称啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'];
      if (hintContent.value.length <= 0) return;
      showPopupHint.value = true;
    };

    let hiddenTimmer = null;
    const hidePopupHintHandler = () => {
      hiddenTimmer = setTimeout(() => {
        showPopupHint.value = false;
      }, 600);
    };

    const enterPopupHintHandler = () => {
      // console.log('enter popup hint');
      if (hiddenTimmer) clearTimeout(hiddenTimmer);
    };

    const leavePopupHintHandler = () => {
      // console.log('leave popup hint');
      hiddenTimmer = setTimeout(() => {
        showPopupHint.value = false;
      }, 600);
    };

    // rename folder name modal
    const showRenameFolderModal = ref(false);
    const renameFolderHandler = () => {
      showRenameFolderModal.value = true;
      showPopupMenu.value = false;
    };
    const getRenameResultHandler = (obj) => {
      console.log(obj);
    };

    // add subfolder modal
    const showAddSubfolderModal = ref(false);
    const addSubfolderHandler = () => {
      showAddSubfolderModal.value = true;
      showPopupMenu.value = false;
    };
    const getSubfolderNameHandler = (obj) => {
      console.log(obj);
    };

    // delete folder modal
    const showConfirmDeleteModal = ref(false);
    const deleteItemHandler = () => {
      showConfirmDeleteModal.value = true;
      showPopupMenu.value = false;
    };
    const getResultHandlerd = (value) => {
      console.log(value);
    };

    return {
      selectFolderCandidate,
      foldersMode,
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

.btn {
  @apply hover:bg-gray-200 rounded;
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

.select-folders {
  min-height: 2rem;
  max-height: 5rem;
}

.dissolve-enter-from,
.dissolve-leave-to {
  opacity: 0
}

.dissolve-enter-active, .dissolve-leave-active {
  transition: opacity 300ms ease-in-out 500ms;
}

</style>
