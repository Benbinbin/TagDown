<template>
  <section class="p-8 border-b-2 border-gray-200">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold py-4 text-gray-800">
        Gist 分享书签
      </h2>
      <div class="flex items-center space-x-2">
        <button
          title="set github token"
          class="px-2 py-1 flex items-center text-sm text-white bg-green-400 hover:bg-green-600 space-x-2 rounded"
          @click="showInputTokenModal = true"
        >
          <svg
            v-if="token"
            class="w-5 h-5"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.1845 5C27.8462 5.00172 25.5415 5.55653 23.4586 6.61911C21.3757 7.68169 19.5737 9.22191 18.1997 11.114C16.8257 13.006 15.9187 15.1963 15.5529 17.5058C15.187 19.8153 15.3726 22.1787 16.0945 24.4028L5.43388 35.0635C5.15609 35.3414 5.00003 35.7182 5 36.1111V43.5185C5 43.9114 5.15608 44.2883 5.4339 44.5661C5.71173 44.8439 6.08854 45 6.48144 45H13.8887C14.2816 45 14.6584 44.8439 14.9362 44.5661C15.214 44.2883 15.3701 43.9114 15.3701 43.5185V40.5556H18.333C18.7259 40.5556 19.1027 40.3995 19.3805 40.1216C19.6583 39.8438 19.8144 39.467 19.8144 39.0741V36.1111H22.7773C23.1703 36.1111 23.5472 35.9551 23.8251 35.6772L25.5967 33.9054C27.6335 34.5686 29.7899 34.7822 31.9173 34.5316C34.0446 34.2809 36.0923 33.572 37.9193 32.4536C39.7462 31.3352 41.3089 29.8339 42.4997 28.0533C43.6905 26.2727 44.481 24.255 44.8168 22.1393C45.1526 20.0237 45.0257 17.8604 44.4448 15.7986C43.8639 13.7367 42.8428 11.8253 41.452 10.1962C40.0611 8.56703 38.3336 7.25884 36.3884 6.36178C34.4432 5.46472 32.3266 5.00012 30.1845 5ZM33.8878 19.0741C33.3018 19.0741 32.7289 18.9003 32.2417 18.5747C31.7544 18.2491 31.3747 17.7864 31.1504 17.245C30.9262 16.7036 30.8675 16.1078 30.9818 15.5331C31.0961 14.9583 31.3783 14.4304 31.7927 14.016C32.2071 13.6016 32.735 13.3194 33.3097 13.2051C33.8845 13.0908 34.4802 13.1494 35.0216 13.3737C35.563 13.5979 36.0257 13.9777 36.3513 14.465C36.6769 14.9522 36.8506 15.5251 36.8506 16.1111C36.8506 16.8969 36.5385 17.6506 35.9828 18.2062C35.4272 18.7619 34.6736 19.0741 33.8878 19.0741Z"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.1845 5C27.8462 5.00169 25.5415 5.55648 23.4586 6.61905C21.3756 7.68161 19.5736 9.22183 18.1996 11.1139C16.8256 13.006 15.9186 15.1962 15.5527 17.5058C15.1868 19.8153 15.3724 22.1787 16.0943 24.4028L5.43388 35.0635C5.15609 35.3414 5.00003 35.7182 5 36.1111V43.5185C5 43.9114 5.15608 44.2883 5.4339 44.5661C5.71173 44.8439 6.08854 45 6.48144 45H13.8887C14.2816 45 14.6584 44.8439 14.9362 44.5661C15.214 44.2883 15.3701 43.9114 15.3701 43.5185V40.5556H18.333C18.7259 40.5556 19.1027 40.3995 19.3805 40.1216C19.6583 39.8438 19.8144 39.467 19.8144 39.0741V36.1111H22.7773C23.1702 36.1111 23.547 35.955 23.8249 35.6772L25.5967 33.9054C27.6335 34.5686 29.7899 34.7822 31.9173 34.5316C34.0446 34.2809 36.0923 33.572 37.9193 32.4536C39.7462 31.3352 41.3089 29.8339 42.4997 28.0533C43.6905 26.2727 44.481 24.255 44.8168 22.1393C45.1526 20.0237 45.0257 17.8604 44.4448 15.7986C43.8639 13.7367 42.8428 11.8253 41.452 10.1962C40.0611 8.56703 38.3336 7.25884 36.3884 6.36178C34.4432 5.46472 32.3266 5.00012 30.1845 5ZM30.1845 31.6667C28.6847 31.6693 27.1982 31.3858 25.8046 30.8315C25.532 30.7135 25.2302 30.6802 24.9384 30.7358C24.6466 30.7915 24.3783 30.9335 24.1682 31.1435L22.1638 33.1481H18.333C17.9401 33.1481 17.5633 33.3042 17.2854 33.5821C17.0076 33.8599 16.8515 34.2367 16.8515 34.6296V37.5926H13.8887C13.4958 37.5926 13.1189 37.7487 12.8411 38.0265C12.5633 38.3043 12.4072 38.6812 12.4072 39.0741V42.037H7.96289V36.7246L18.8561 25.8313C19.0661 25.6212 19.2082 25.3529 19.2638 25.0612C19.3195 24.7694 19.2862 24.4676 19.1683 24.195C18.2308 21.8387 18.0737 19.2439 18.7199 16.7917C19.3661 14.3396 20.7817 12.1592 22.7586 10.5711C24.7356 8.9829 27.1698 8.07061 29.7036 7.96819C32.2373 7.86577 34.7372 8.57864 36.8359 10.0021C38.9346 11.4255 40.5215 13.4844 41.3635 15.8765C42.2055 18.2685 42.2583 20.8675 41.514 23.2918C40.7697 25.716 39.2677 27.8377 37.2284 29.3451C35.1892 30.8525 32.7204 31.6662 30.1845 31.6667ZM36.1097 16.1111C36.1097 16.5506 35.9794 16.9803 35.7352 17.3457C35.4911 17.7112 35.144 17.996 34.738 18.1642C34.3319 18.3324 33.8851 18.3764 33.4541 18.2906C33.023 18.2049 32.627 17.9932 32.3163 17.6825C32.0055 17.3717 31.7939 16.9757 31.7081 16.5446C31.6224 16.1136 31.6664 15.6668 31.8346 15.2607C32.0028 14.8546 32.2876 14.5076 32.653 14.2634C33.0184 14.0192 33.4481 13.8889 33.8876 13.8889C34.4767 13.8895 35.0416 14.1239 35.4582 14.5405C35.8748 14.9571 36.1091 15.5219 36.1097 16.1111Z"
            />
          </svg>
          <span>{{ tokenState }}</span>
        </button>
        <button
          v-if="token"
          title="set github token"
          class="px-2 py-1 flex items-center text-sm text-white bg-red-400 hover:bg-red-600 space-x-2 rounded"
          @click="clearTokenHandler"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.5 11H34.0007V9.5C33.9994 8.30694 33.5249 7.16312 32.6813 6.3195C31.8376 5.47588 30.6938 5.00134 29.5007 5H20.5007C19.3077 5.00134 18.1639 5.47588 17.3202 6.3195C16.4766 7.16312 16.0021 8.30694 16.0007 9.5V11H8.5C8.10217 11 7.72064 11.158 7.43934 11.4393C7.15804 11.7206 7 12.1022 7 12.5C7 12.8978 7.15804 13.2794 7.43934 13.5607C7.72064 13.842 8.10217 14 8.5 14H10V41C10.0009 41.7954 10.3173 42.5579 10.8797 43.1203C11.4421 43.6827 12.2046 43.9991 13 44H37C37.7954 43.9991 38.5579 43.6827 39.1203 43.1203C39.6827 42.5579 39.9991 41.7954 40 41V14H41.5C41.8978 14 42.2794 13.842 42.5607 13.5607C42.842 13.2794 43 12.8978 43 12.5C43 12.1022 42.842 11.7206 42.5607 11.4393C42.2794 11.158 41.8978 11 41.5 11ZM19.0007 9.5C19.0012 9.10233 19.1594 8.72109 19.4406 8.43989C19.7218 8.15869 20.1031 8.0005 20.5007 8H29.5007C29.8984 8.0005 30.2797 8.15869 30.5609 8.43989C30.8421 8.72109 31.0003 9.10233 31.0007 9.5V11H19.0007V9.5ZM37 41H13V14H37V41ZM22.0007 21.5V33.5C22.0007 33.8978 21.8427 34.2794 21.5614 34.5607C21.2801 34.842 20.8986 35 20.5007 35C20.1029 35 19.7214 34.842 19.4401 34.5607C19.1588 34.2794 19.0007 33.8978 19.0007 33.5V21.5C19.0007 21.1022 19.1588 20.7206 19.4401 20.4393C19.7214 20.158 20.1029 20 20.5007 20C20.8986 20 21.2801 20.158 21.5614 20.4393C21.8427 20.7206 22.0007 21.1022 22.0007 21.5ZM31.0007 21.5V33.5C31.0007 33.8978 30.8427 34.2794 30.5614 34.5607C30.2801 34.842 29.8986 35 29.5007 35C29.1029 35 28.7214 34.842 28.4401 34.5607C28.1588 34.2794 28.0007 33.8978 28.0007 33.5V21.5C28.0007 21.1022 28.1588 20.7206 28.4401 20.4393C28.7214 20.158 29.1029 20 29.5007 20C29.8986 20 30.2801 20.158 30.5614 20.4393C30.8427 20.7206 31.0007 21.1022 31.0007 21.5Z"
            />
          </svg>
          <span>清除 Token</span>
        </button>
      </div>
    </div>
    <div class="flex items-center space-x-2">
      <button
        title="add gist"
        class="px-2 py-1 flex items-center text-white text-sm bg-green-400 hover:bg-green-600 space-x-2 rounded"
        :class="{
          'opacity-10': !token
        }"
        :disabled="!token"
        @click="addGistHandler"
      >
        <svg
          class="w-5 h-5"
          viewBox="0 0 50 50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 5C21.0444 5 17.1776 6.17298 13.8886 8.37061C10.5996 10.5682 8.03617 13.6918 6.52242 17.3463C5.00867 21.0008 4.6126 25.0222 5.3843 28.9018C6.15601 32.7814 8.06082 36.3451 10.8579 39.1421C13.6549 41.9392 17.2186 43.844 21.0982 44.6157C24.9778 45.3874 28.9991 44.9913 32.6537 43.4776C36.3082 41.9638 39.4318 39.4004 41.6294 36.1114C43.827 32.8224 45 28.9556 45 25C44.994 19.6975 42.8849 14.6139 39.1355 10.8645C35.3861 7.11507 30.3025 5.00601 25 5ZM25 41.9231C21.6529 41.9231 18.381 40.9305 15.598 39.071C12.8151 37.2115 10.646 34.5685 9.36512 31.4762C8.08426 28.3839 7.74912 24.9812 8.4021 21.6985C9.05508 18.4157 10.6669 15.4003 13.0336 13.0336C15.4003 10.6668 18.4157 9.05508 21.6985 8.40209C24.9812 7.74911 28.3839 8.08425 31.4762 9.36511C34.5685 10.646 37.2115 12.8151 39.071 15.598C40.9306 18.381 41.9231 21.6529 41.9231 25C41.918 29.4867 40.1334 33.7882 36.9608 36.9608C33.7882 40.1334 29.4867 41.918 25 41.9231ZM34.2308 25C34.2308 25.408 34.0687 25.7993 33.7802 26.0879C33.4917 26.3764 33.1003 26.5385 32.6923 26.5385H26.5385V32.6923C26.5385 33.1003 26.3764 33.4916 26.0879 33.7802C25.7993 34.0687 25.408 34.2308 25 34.2308C24.592 34.2308 24.2007 34.0687 23.9121 33.7802C23.6236 33.4916 23.4615 33.1003 23.4615 32.6923V26.5385H17.3077C16.8997 26.5385 16.5084 26.3764 16.2198 26.0879C15.9313 25.7993 15.7692 25.408 15.7692 25C15.7692 24.592 15.9313 24.2007 16.2198 23.9121C16.5084 23.6236 16.8997 23.4615 17.3077 23.4615H23.4615V17.3077C23.4615 16.8997 23.6236 16.5084 23.9121 16.2198C24.2007 15.9313 24.592 15.7692 25 15.7692C25.408 15.7692 25.7993 15.9313 26.0879 16.2198C26.3764 16.5084 26.5385 16.8997 26.5385 17.3077V23.4615H32.6923C33.1003 23.4615 33.4917 23.6236 33.7802 23.9121C34.0687 24.2007 34.2308 24.592 34.2308 25Z"
          />
        </svg>
        <span>新增 Gist</span>
      </button>
      <button
        title="sync all gists"
        class="px-2 py-1 flex items-center text-white text-sm bg-green-400 hover:bg-green-600 space-x-2 rounded"
        :class="{
          'opacity-10': !token
        }"
        :disabled="!token"
      >
        <svg
          class="w-5 h-5"
          viewBox="0 0 50 50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M43.6827 21.178C43.6602 21.181 43.6383 21.1852 43.6155 21.1874C43.5652 21.1923 43.5147 21.1949 43.464 21.1949H34.248C33.8407 21.1949 33.45 21.0368 33.1619 20.7554C32.8739 20.4739 32.712 20.0922 32.712 19.6942C32.712 19.2962 32.8739 18.9145 33.1619 18.6331C33.45 18.3517 33.8407 18.1935 34.248 18.1935H39.7557L35.861 14.3886C32.9783 11.5783 29.0723 10.0001 25 10.0001C20.9277 10.0001 17.0217 11.5783 14.139 14.3886C13.8509 14.67 13.4602 14.8281 13.0527 14.8281C12.6453 14.8281 12.2546 14.67 11.9665 14.3886C11.6784 14.1071 11.5166 13.7253 11.5166 13.3273C11.5166 12.9292 11.6784 12.5475 11.9665 12.266C15.4259 8.89383 20.1132 7 25 7C29.8868 7 34.5741 8.89383 38.0335 12.266L41.928 16.071V10.6901C41.928 10.2921 42.0898 9.9104 42.3779 9.62897C42.6659 9.34754 43.0566 9.18943 43.464 9.18943C43.8714 9.18943 44.2621 9.34754 44.5501 9.62897C44.8382 9.9104 45 10.2921 45 10.6901V19.6931C45 19.743 44.9973 19.7929 44.9923 19.8426C44.9904 19.8627 44.9864 19.8822 44.9835 19.9021C44.9795 19.9308 44.9758 19.9595 44.97 19.9878C44.9654 20.0112 44.9587 20.0339 44.9528 20.0572C44.9466 20.0816 44.9412 20.106 44.9336 20.1304C44.9265 20.1529 44.9178 20.1748 44.9098 20.197C44.9009 20.221 44.8929 20.2452 44.8829 20.269C44.874 20.2893 44.8639 20.3086 44.8545 20.3285C44.8427 20.3532 44.8314 20.378 44.818 20.4022C44.808 20.4204 44.7967 20.4378 44.7859 20.4555C44.7711 20.4798 44.7571 20.5044 44.7406 20.5282C44.7279 20.5466 44.7137 20.5639 44.7003 20.5819C44.684 20.6035 44.6686 20.6252 44.6511 20.646C44.6289 20.6725 44.6047 20.6974 44.5807 20.7224C44.5701 20.7331 44.5611 20.7447 44.5501 20.7552C44.5398 20.7653 44.5284 20.774 44.5177 20.7839C44.4918 20.8077 44.4659 20.8318 44.4382 20.8539C44.4179 20.8704 44.3963 20.8848 44.3752 20.9C44.356 20.9139 44.3374 20.9285 44.3176 20.9415C44.294 20.9569 44.2698 20.9702 44.2458 20.9841C44.2266 20.9951 44.2082 21.0068 44.1886 21.0171C44.1646 21.0297 44.1402 21.0402 44.1158 21.0514C44.0947 21.0612 44.0738 21.0715 44.0521 21.0803C44.0289 21.0897 44.0051 21.0972 43.9814 21.1054C43.9578 21.1139 43.9344 21.1227 43.91 21.1298C43.8868 21.1368 43.863 21.1418 43.8394 21.1476C43.8144 21.1538 43.7896 21.1608 43.7641 21.1657C43.7372 21.1709 43.71 21.1739 43.6827 21.1778V21.178ZM35.861 35.6113C32.9783 38.4215 29.0723 39.9997 25 39.9997C20.9277 39.9997 17.0217 38.4215 14.139 35.6113L10.2443 31.8063H15.752C16.1593 31.8063 16.55 31.6482 16.8381 31.3667C17.1261 31.0853 17.288 30.7036 17.288 30.3056C17.288 29.9076 17.1261 29.5259 16.8381 29.2444C16.55 28.963 16.1593 28.8049 15.752 28.8049H6.536C6.52448 28.8049 6.51353 28.8064 6.50201 28.8068C6.46304 28.8075 6.42425 28.8086 6.38547 28.8124C6.35897 28.8148 6.33305 28.8195 6.30694 28.8235C6.28352 28.8268 6.2599 28.8295 6.23667 28.834C6.20883 28.8392 6.18176 28.8467 6.15449 28.8535C6.13337 28.8587 6.11187 28.8632 6.09075 28.8694C6.06483 28.8771 6.03968 28.8867 6.01414 28.8957C5.99225 28.9034 5.97017 28.9103 5.94848 28.9191C5.92544 28.9285 5.90355 28.9394 5.88128 28.9497C5.85805 28.9604 5.83462 28.9703 5.81197 28.9824C5.79142 28.993 5.77203 29.0052 5.75225 29.0167C5.72883 29.0302 5.70541 29.0431 5.68275 29.0579C5.66221 29.0713 5.6432 29.0861 5.62361 29.1005C5.60288 29.1155 5.58176 29.1294 5.56179 29.1456C5.53395 29.1681 5.50784 29.1921 5.48173 29.2163C5.47117 29.2258 5.46003 29.2345 5.44985 29.2444C5.43891 29.2549 5.42989 29.2665 5.41933 29.2772C5.39533 29.3022 5.37113 29.3271 5.34886 29.3536C5.33139 29.3742 5.31603 29.3962 5.2999 29.4177C5.28646 29.4356 5.27206 29.453 5.25939 29.4714C5.24307 29.4952 5.22867 29.5198 5.21408 29.5442C5.20333 29.562 5.192 29.5793 5.18202 29.5974C5.16858 29.6216 5.15744 29.6464 5.14554 29.6712C5.13594 29.6911 5.12595 29.7106 5.11731 29.7306C5.10733 29.7543 5.09907 29.7787 5.09043 29.8027C5.08218 29.8248 5.07354 29.8467 5.06643 29.8693C5.05894 29.8936 5.05338 29.918 5.04723 29.9424C5.04147 29.9657 5.03456 29.9884 5.02995 30.0118C5.02419 30.0402 5.02054 30.0689 5.01651 30.0976C5.01363 30.1174 5.00979 30.1369 5.00768 30.157C5.00269 30.2067 5 30.2566 5 30.3065V39.3097C5 39.7077 5.16183 40.0894 5.44988 40.3708C5.73794 40.6523 6.12862 40.8104 6.536 40.8104C6.94337 40.8104 7.33405 40.6523 7.62211 40.3708C7.91016 40.0894 8.07199 39.7077 8.07199 39.3097V33.929L11.9665 37.734C15.4259 41.1062 20.1132 43 25 43C29.8868 43 34.5741 41.1062 38.0335 37.734C38.3216 37.4525 38.4834 37.0708 38.4834 36.6727C38.4834 36.2747 38.3216 35.8929 38.0335 35.6114C37.7454 35.33 37.3547 35.1719 36.9473 35.1719C36.5398 35.1719 36.1491 35.33 35.861 35.6114V35.6113Z"
          />
        </svg>
        <span>同步所有</span>
      </button>
      <button
        title="sync all gists"
        class="px-2 py-1 flex items-center text-white text-sm bg-red-400 hover:bg-red-600 space-x-2 rounded"
        @click="clearGistsRecordHandler"
      >
        <svg
          class="w-5 h-5"
          viewBox="0 0 50 50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M41.5 11H34.0007V9.5C33.9994 8.30694 33.5249 7.16312 32.6813 6.3195C31.8376 5.47588 30.6938 5.00134 29.5007 5H20.5007C19.3077 5.00134 18.1639 5.47588 17.3202 6.3195C16.4766 7.16312 16.0021 8.30694 16.0007 9.5V11H8.5C8.10217 11 7.72064 11.158 7.43934 11.4393C7.15804 11.7206 7 12.1022 7 12.5C7 12.8978 7.15804 13.2794 7.43934 13.5607C7.72064 13.842 8.10217 14 8.5 14H10V41C10.0009 41.7954 10.3173 42.5579 10.8797 43.1203C11.4421 43.6827 12.2046 43.9991 13 44H37C37.7954 43.9991 38.5579 43.6827 39.1203 43.1203C39.6827 42.5579 39.9991 41.7954 40 41V14H41.5C41.8978 14 42.2794 13.842 42.5607 13.5607C42.842 13.2794 43 12.8978 43 12.5C43 12.1022 42.842 11.7206 42.5607 11.4393C42.2794 11.158 41.8978 11 41.5 11ZM19.0007 9.5C19.0012 9.10233 19.1594 8.72109 19.4406 8.43989C19.7218 8.15869 20.1031 8.0005 20.5007 8H29.5007C29.8984 8.0005 30.2797 8.15869 30.5609 8.43989C30.8421 8.72109 31.0003 9.10233 31.0007 9.5V11H19.0007V9.5ZM37 41H13V14H37V41ZM22.0007 21.5V33.5C22.0007 33.8978 21.8427 34.2794 21.5614 34.5607C21.2801 34.842 20.8986 35 20.5007 35C20.1029 35 19.7214 34.842 19.4401 34.5607C19.1588 34.2794 19.0007 33.8978 19.0007 33.5V21.5C19.0007 21.1022 19.1588 20.7206 19.4401 20.4393C19.7214 20.158 20.1029 20 20.5007 20C20.8986 20 21.2801 20.158 21.5614 20.4393C21.8427 20.7206 22.0007 21.1022 22.0007 21.5ZM31.0007 21.5V33.5C31.0007 33.8978 30.8427 34.2794 30.5614 34.5607C30.2801 34.842 29.8986 35 29.5007 35C29.1029 35 28.7214 34.842 28.4401 34.5607C28.1588 34.2794 28.0007 33.8978 28.0007 33.5V21.5C28.0007 21.1022 28.1588 20.7206 28.4401 20.4393C28.7214 20.158 29.1029 20 29.5007 20C29.8986 20 30.2801 20.158 30.5614 20.4393C30.8427 20.7206 31.0007 21.1022 31.0007 21.5Z"
          />
        </svg>
        <span>删除所有</span>
      </button>
    </div>
    <div class="py-4 pr-2 flex flex-wrap">
      <GistRecord
        v-for="gistRecord of gistsRecords"
        :key="gistRecord.gistId"
        class="mt-2 ml-2"
        :gist-record="gistRecord"
        @edit-gist-record="editGistHandler(gistRecord)"
      />
    </div>
  </section>
  <transition name="dissolve">
    <div
      v-if="showMsg && msg"
      class="fixed top-4 right-4 z-10 p-4 text-white rounded shadow"
      :class="{
        'bg-green-400': msg.state === true,
        'bg-red-400': msg.state === false
      }"
    >
      {{ msg.title }}
    </div>
  </transition>
  <InputTokenModal
    v-if="showInputTokenModal"
    v-model:show="showInputTokenModal"
    @update-token-state="updateTokenStateHandler"
  />
  <PromptModal
    v-if="showDeleteTokenConfirmModal"
    v-model:show="showDeleteTokenConfirmModal"
    @result="getDeleteTokenResult"
  >
    <template #title>
      <h2 class="p-4 text-xl font-bold">
        删除 Token
      </h2>
    </template>
    <template #msg>
      <p class="p-2 text-base text-center">
        该操作不可恢复
      </p>
    </template>
  </PromptModal>
  <SetGistModal
    v-if="showSetGistModal"
    v-model:show="showSetGistModal"
    :gist-init="currentGist"
    @result="getSetGistResult"
  />
  <PromptModal
    v-if="showDeleteGistsRecordConfirmModal"
    v-model:show="showDeleteGistsRecordConfirmModal"
    @result="getDeleteGistsRecordResult"
  >
    <template #title>
      <h2 class="p-4 text-xl font-bold">
        删除所有 Gist
      </h2>
    </template>
    <template #msg>
      <p class="p-2 text-base text-center">
        该操作不可恢复
      </p>
    </template>
  </PromptModal>
</template>
<script>
import {
  ref, onMounted, inject,
} from 'vue';
import InputTokenModal from './Modal/InputTokenModal.vue';
import SetGistModal from './Modal/SetGistModal.vue';
import PromptModal from './Modal/PromptModal.vue';
import GistRecord from './GistRecord.vue';
import useGist from '@/composables/useGist';

export default {
  components: {
    InputTokenModal,
    SetGistModal,
    PromptModal,
    GistRecord,
  },
  setup(props) {
    const db = inject('db');

    const {
      setGithubToken, getGithubToken, clearGithubToken, getGistsRecord, setGistsRecord, clearGistsRecord, createGist, updateGist,
    } = useGist();

    /**
     * popup msg
     */
    const showMsg = ref(false);
    const msg = ref(null);

    const setMsg = (state, title, duration = 1000) => {
      msg.value = {
        state,
        title,
      };
      showMsg.value = true;
      let timer = setTimeout(() => {
        showMsg.value = false;
        msg.value = null;
        timer = null;
      }, duration);
    };

    /**
     * github token
     */
    const tokenState = ref('添加 token');
    const token = ref('');
    const showInputTokenModal = ref(false);

    const updateTokenStateHandler = async () => {
      token.value = await getGithubToken();
      if (token.value) {
        tokenState.value = '修改 Token';
      } else {
        tokenState.value = '添加 Token';
      }
    };

    onMounted(async () => {
      await updateTokenStateHandler();
    });

    const showDeleteTokenConfirmModal = ref(false);
    const clearTokenHandler = () => {
      showDeleteTokenConfirmModal.value = true;
    };

    const getDeleteTokenResult = async (value) => {
      if (value) {
        await clearGithubToken();
        await updateTokenStateHandler();
      }
    };

    /**
     * gist record
     */
    // get gists record
    const gistsRecords = ref([]);
    const updateGistsRecord = async () => {
      gistsRecords.value = await getGistsRecord();
      // console.log(gistsRecords.value);
    };
    onMounted(async () => {
      await updateGistsRecord();
    });

    // add or edit gist record
    const showSetGistModal = ref(false);
    const currentGist = ref(null);
    const addGistHandler = () => {
      currentGist.value = null;
      showSetGistModal.value = true;
    };

    const editGistHandler = (gistRecord) => {
      console.log(gistRecord);
      currentGist.value = gistRecord;
      showSetGistModal.value = true;
    };

    const getBookmarksByGroup = (group, shareableIds = []) => new Promise((resolve, reject) => {
      db.bookmark.where('groups').equals(group).filter((item) => shareableIds.includes(item.id)).toArray()
        .then((result) => {
          resolve({
            group,
            bookmarks: result,
          });
        });
    });

    const getSetGistResult = async (result) => {
      console.log('result', result);
      const shareableIds = await db.share.where('share').equals(1).primaryKeys();
      const promiseArr = [];
      result.groups.forEach((group) => {
        promiseArr.push(getBookmarksByGroup(group, shareableIds));
      });
      const fileContent = await Promise.all(promiseArr);

      if (!result.gistId) {
        // add new gist
        const res = await createGist(token.value, {
          description: result.description,
          public: result.gistType === 'public',
          files: { [`${result.filename}.json`]: { content: JSON.stringify(fileContent) } },
        });
        // console.log(res);
        if (res.state) {
          const newGistRecord = {
            filename: result.filename,
            gistId: res.data.id,
            gistType: result.gistType,
            description: result.description,
            groups: result.groups,
          };
          const gistsRecord = await getGistsRecord();
          console.log(gistsRecord);
          if (gistsRecord) {
            gistsRecord.unshift(newGistRecord); // return the new arr length
            await setGistsRecord(gistsRecord);
          } else {
            await setGistsRecord([newGistRecord]);
          }
          await updateGistsRecord();
          // setMsg(true, '创建成功');
        } else {
          setMsg(false, '创建失败');
        }
      } else {
        const gistsRecord = await getGistsRecord();
        // console.log(gistsRecord);
        const index = gistsRecord.findIndex((item) => item.gistId === currentGist.value.gistId);
        console.log(index);
        if (index === -1) {
          setMsg(false, '更新失败');
          return;
        }

        // edit gist
        const res = await updateGist(token.value, currentGist.value.gistId, {
          gist_id: currentGist.value.gistId,
          description: result.description,
          files: { [`${result.filename}.json`]: { content: JSON.stringify(fileContent) } },
        });

        console.log(res);

        if (res.state) {
          const newGistRecord = {
            filename: result.filename,
            gistId: res.data.id,
            gistType: result.gistType,
            description: result.description,
            groups: result.groups,
          };
          gistsRecord.splice(index, 1, newGistRecord);
          await setGistsRecord(gistsRecord);

          await updateGistsRecord();
          setMsg(true, '更新成功');
        } else {
          setMsg(false, '更新失败');
        }
      }
      currentGist.value = null;
    };

    // clear all gist
    const showDeleteGistsRecordConfirmModal = ref(false);
    const clearGistsRecordHandler = () => {
      console.log('clear gist record');
      showDeleteGistsRecordConfirmModal.value = true;
    };
    const getDeleteGistsRecordResult = async (value) => {
      if (value) {
        await clearGistsRecord();
        await updateGistsRecord();
      }
    };

    return {
      showMsg,
      msg,
      token,
      tokenState,
      showInputTokenModal,
      updateTokenStateHandler,
      showDeleteTokenConfirmModal,
      clearTokenHandler,
      getDeleteTokenResult,
      showSetGistModal,
      currentGist,
      addGistHandler,
      editGistHandler,
      getSetGistResult,
      gistsRecords,
      updateGistsRecord,
      showDeleteGistsRecordConfirmModal,
      clearGistsRecordHandler,
      getDeleteGistsRecordResult,
    };
  },
};
</script>
<style lang="scss" scoped>
.dissolve-enter-from,
.dissolve-leave-to {
  opacity: 0;
}

.dissolve-enter-active,
.dissolve-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
