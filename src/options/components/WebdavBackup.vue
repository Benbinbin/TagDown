<template>
  <div class="space-y-4">
    <h3 class="text-base font-bold">
      WebDAV 备份
    </h3>
    <div class="p-4 flex flex-col items-center border-2 border-gray-200 border-dashed rounded">
      <div
        v-show="showWebDAVInfo"
        class="space-y-2"
      >
        <div class="flex items-center space-x-4">
          <label
            class="text-base"
            for="url"
          >网址</label>
          <input
            id="url"
            v-model="webDAVUrl"
            class="input-style p-0.5"
            type="url"
            name="url"
            required
          >
        </div>
        <div class="flex items-center space-x-4">
          <label
            class="text-base"
            for="username"
          >账户</label>
          <input
            id="username"
            v-model="webDAVUsername"
            class="input-style p-0.5"
            type="text"
            name="username"
            required
          >
        </div>
        <div class="flex items-center space-x-4">
          <label
            class="text-base"
            for="password"
          >密码</label>
          <input
            id="password"
            v-model="webDAVPassword"
            class="input-style p-0.5"
            type="password"
            name="password"
            required
          >
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-base">同步</span>
          <div class="px-2 py-1 flex items-center hover:bg-gray-200 rounded space-x-0.5">
            <input
              id="manual"
              v-model="webDAVSync"
              type="radio"
              value="manual"
            >
            <label for="manual">手动</label>
          </div>
          <div class="px-2 py-1 flex items-center hover:bg-gray-200 rounded space-x-0.5">
            <input
              id="auto"
              v-model="webDAVSync"
              type="radio"
              value="auto"
            >
            <label for="auto">自动</label>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <button
            title="set webdav information"
            class="px-2 py-1 text-sm text-white bg-green-400 hover:bg-green-600 rounded"
            :class="{
              'opacity-10': !webDAVInfoIntegrity
            }"
            :disabled="!webDAVInfoIntegrity"
            @click="saveWebDAVInfoHandler"
          >
            确定
          </button>
          <button
            title="cancel setting webdav information"
            class="px-2 py-1 text-sm text-white bg-gray-400 hover:bg-gray-600 rounded"
            :class="{
              'opacity-10': webDAVState === '未添加' || webDAVState === '未获得访问权限' || webDAVState === '连接失败'
            }"
            :disabled="webDAVState === '未添加' || webDAVState === '未获得访问权限' || webDAVState === '连接失败'"
            @click="toggleWebDAVInfoHandler"
          >
            取消
          </button>
          <button
            title="cancel setting webdav information"
            class="px-2 py-1 text-sm text-white bg-red-400 hover:bg-red-600 rounded"
            @click="clearWebDAVInfoHandler"
          >
            清空
          </button>
        </div>
      </div>
      <div
        v-show="!showWebDAVInfo"
        class="space-y-2"
      >
        <button
          title="sync indexedDB database"
          class="px-2 py-1 flex items-center text-white bg-green-400 hover:bg-green-600 space-x-1 rounded"
          @click="createDatabaseBackupHandler"
        >
          <svg
            class="w-6 h-6"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.9999 24.5C45.009 27.6394 44.0045 30.6955 42.1397 33.2016C42.0377 33.3414 41.9094 33.4593 41.7622 33.5486C41.6151 33.6378 41.4519 33.6967 41.2822 33.7217C41.1126 33.7468 40.9397 33.7376 40.7735 33.6946C40.6073 33.6516 40.4512 33.5757 40.3141 33.4712C40.177 33.3668 40.0616 33.2359 39.9746 33.086C39.8877 32.9362 39.8308 32.7703 39.8072 32.5981C39.7837 32.4258 39.794 32.2506 39.8376 32.0824C39.8812 31.9142 39.9571 31.7564 40.0611 31.6182C41.1733 30.1142 41.9172 28.3638 42.2314 26.5112C42.5456 24.6586 42.4212 22.7567 41.8684 20.9624C41.3156 19.1681 40.3502 17.5327 39.0518 16.1909C37.7534 14.8492 36.1592 13.8395 34.4004 13.2451C32.6417 12.6506 30.7689 12.4885 28.9363 12.772C27.1036 13.0555 25.3637 13.7765 23.8598 14.8757C22.3558 15.9748 21.131 17.4206 20.2862 19.0939C19.4415 20.7672 19.0009 22.6201 19.0008 24.5C19.0008 24.8496 18.8639 25.1848 18.6201 25.4321C18.3763 25.6793 18.0457 25.8181 17.7009 25.8181C17.3561 25.8181 17.0255 25.6793 16.7817 25.4321C16.5379 25.1848 16.4009 24.8496 16.4009 24.5C16.4001 23.1696 16.5802 21.8456 16.9362 20.5652C16.758 20.5525 16.5795 20.5459 16.4009 20.5454C14.3323 20.5454 12.3484 21.3787 10.8857 22.8619C9.42295 24.3452 8.60119 26.3569 8.60119 28.4545C8.60119 30.5521 9.42295 32.5639 10.8857 34.0471C12.3484 35.5303 14.3323 36.3636 16.4009 36.3636H20.3008C20.6456 36.3636 20.9762 36.5025 21.22 36.7497C21.4638 36.9969 21.6007 37.3322 21.6007 37.6818C21.6007 38.0314 21.4638 38.3667 21.22 38.6139C20.9762 38.8611 20.6456 39 20.3008 39H16.4009C14.9714 39.0002 13.5571 38.7015 12.2465 38.1226C10.9358 37.5437 9.757 36.6969 8.78355 35.6353C7.8101 34.5737 7.06296 33.32 6.58877 31.9524C6.11458 30.5849 5.92354 29.1329 6.02757 27.6871C6.13161 26.2413 6.52848 24.8328 7.19341 23.5496C7.85834 22.2663 8.77704 21.1358 9.89215 20.2287C11.0073 19.3216 12.2948 18.6574 13.6744 18.2775C15.0541 17.8977 16.4961 17.8103 17.9105 18.0209C19.3498 15.0983 21.7204 12.7542 24.6378 11.3687C27.5553 9.98311 30.8488 9.63728 33.9844 10.3872C37.1199 11.1372 39.9138 12.9389 41.9132 15.5005C43.9126 18.062 45.0003 21.2332 44.9999 24.5ZM30.3202 23.5687C30.2897 23.5376 30.2576 23.5081 30.2242 23.4803C30.2105 23.469 30.1962 23.4593 30.1822 23.4485C30.1623 23.4334 30.1426 23.4177 30.122 23.4036C30.1044 23.3917 30.0864 23.3816 30.0685 23.3706C30.05 23.3594 30.0319 23.3477 30.0128 23.3373C29.9944 23.3274 29.9754 23.3189 29.9565 23.31C29.937 23.3004 29.9175 23.2905 29.8976 23.282C29.8794 23.2745 29.8608 23.2683 29.8423 23.2617C29.8209 23.2536 29.7994 23.2452 29.7773 23.2386C29.7591 23.233 29.7404 23.2289 29.7221 23.2241C29.6993 23.2184 29.677 23.2119 29.6541 23.2073C29.633 23.203 29.6117 23.2007 29.5904 23.1974C29.5698 23.1945 29.5493 23.1905 29.5284 23.1884C29.4907 23.1848 29.4528 23.1828 29.4149 23.1826C29.4101 23.1826 29.4052 23.1818 29.4005 23.1818C29.3958 23.1818 29.3909 23.1826 29.386 23.1826C29.3481 23.1828 29.3103 23.1848 29.2726 23.1884C29.2516 23.1905 29.2313 23.1945 29.2105 23.1974C29.1894 23.2007 29.1679 23.203 29.1468 23.2073C29.1239 23.2119 29.1015 23.2184 29.0791 23.2241C29.0605 23.2289 29.0419 23.233 29.0237 23.2386C29.0016 23.2452 28.9801 23.2536 28.9587 23.2617C28.9401 23.2683 28.9216 23.2745 28.9034 23.2821C28.8833 23.2905 28.8639 23.3004 28.8444 23.31C28.8256 23.3189 28.8066 23.3274 28.7882 23.3373C28.769 23.3477 28.7508 23.3594 28.7325 23.3708C28.7146 23.3816 28.6966 23.3917 28.6792 23.4036C28.6584 23.4177 28.6387 23.4332 28.6187 23.4485C28.6049 23.4593 28.5904 23.469 28.5768 23.4803C28.5433 23.5081 28.5112 23.5376 28.4806 23.5687L22.966 29.1606C22.8441 29.2827 22.7472 29.4281 22.6809 29.5883C22.6146 29.7486 22.5802 29.9205 22.5797 30.0943C22.5792 30.2681 22.6126 30.4403 22.6779 30.6009C22.7433 30.7616 22.8393 30.9075 22.9605 31.0304C23.0817 31.1533 23.2256 31.2506 23.3841 31.3169C23.5425 31.3832 23.7123 31.417 23.8837 31.4164C24.0551 31.4159 24.2246 31.381 24.3827 31.3138C24.5407 31.2465 24.684 31.1483 24.8045 31.0246L28.1005 27.6824V37.6818C28.1005 38.0314 28.2375 38.3667 28.4813 38.6139C28.7251 38.8611 29.0557 39 29.4005 39C29.7452 39 30.0759 38.8611 30.3197 38.6139C30.5635 38.3667 30.7004 38.0314 30.7004 37.6818V27.6824L33.9965 31.0246C34.1169 31.1483 34.2603 31.2465 34.4183 31.3138C34.5763 31.381 34.7459 31.4159 34.9173 31.4164C35.0887 31.417 35.2584 31.3832 35.4169 31.3169C35.5753 31.2506 35.7193 31.1533 35.8404 31.0304C35.9616 30.9075 36.0577 30.7616 36.123 30.6009C36.1884 30.4403 36.2217 30.2681 36.2212 30.0943C36.2207 29.9205 36.1863 29.7486 36.12 29.5883C36.0537 29.4281 35.9568 29.2827 35.8349 29.1606L30.3202 23.5687Z"
            />
          </svg>
          <span class="text-base">创建新备份</span>
        </button>
        <button
          title="sync indexedDB database"
          class="px-2 py-1 flex items-center text-white bg-green-400 hover:bg-green-600 space-x-1 rounded"
          @click="getDatabaseBackupHandler"
        >
          <svg
            class="w-6 h-6"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M34.8348 31.1571C34.9555 31.2796 35.0513 31.4249 35.1166 31.5848C35.1819 31.7447 35.2156 31.9162 35.2156 32.0893C35.2156 32.2624 35.1819 32.4338 35.1166 32.5937C35.0513 32.7537 34.9555 32.899 34.8348 33.0214L29.32 38.6133C29.2894 38.6443 29.2573 38.6737 29.2238 38.7014C29.2102 38.713 29.1959 38.7225 29.1819 38.7332C29.1619 38.7486 29.1423 38.7642 29.1216 38.7782C29.1041 38.7901 29.0859 38.8003 29.068 38.8112C29.0496 38.8225 29.0316 38.8342 29.0126 38.8445C28.9939 38.8545 28.9746 38.8632 28.9555 38.8725C28.936 38.8817 28.9172 38.8914 28.8974 38.8997C28.8787 38.9076 28.8597 38.9138 28.8408 38.9207C28.8197 38.9283 28.7989 38.9366 28.7773 38.9432C28.7583 38.9491 28.7389 38.9534 28.7198 38.9581C28.698 38.9638 28.6764 38.97 28.6541 38.9745C28.6314 38.9791 28.6086 38.9817 28.5859 38.985C28.5667 38.9878 28.5478 38.9916 28.5283 38.9934C28.4431 39.0019 28.3572 39.0019 28.2719 38.9934C28.2524 38.9916 28.2336 38.9878 28.2144 38.985C28.1916 38.9817 28.1689 38.9791 28.1461 38.9745C28.1239 38.97 28.1023 38.9638 28.0805 38.9581C28.0613 38.9532 28.0421 38.9491 28.023 38.9433C28.0013 38.9367 27.9807 38.9285 27.9596 38.9207C27.9406 38.9138 27.9216 38.9076 27.9029 38.8997C27.883 38.8914 27.864 38.8815 27.8449 38.8723C27.8257 38.8632 27.8065 38.8545 27.7877 38.8445C27.7688 38.8341 27.7508 38.8225 27.7324 38.8113C27.7145 38.8003 27.6962 38.7901 27.6788 38.7784C27.658 38.7642 27.6383 38.7486 27.6185 38.7332C27.6045 38.7225 27.5901 38.7128 27.5766 38.7014C27.5431 38.6737 27.511 38.6443 27.4804 38.6133L21.9656 33.0214C21.8437 32.8993 21.7468 32.7539 21.6805 32.5936C21.6142 32.4334 21.5798 32.2614 21.5792 32.0877C21.5787 31.9139 21.6121 31.7417 21.6774 31.5811C21.7427 31.4204 21.8388 31.2744 21.9599 31.1516C22.0811 31.0287 22.2251 30.9313 22.3835 30.865C22.5419 30.7988 22.7117 30.7649 22.8831 30.7654C23.0545 30.766 23.2241 30.8008 23.3821 30.8681C23.5402 30.9353 23.6835 31.0335 23.804 31.1571L27.1001 34.4996V24.5C27.1001 24.1504 27.2371 23.8151 27.4809 23.5679C27.7247 23.3207 28.0553 23.1818 28.4001 23.1818C28.7449 23.1818 29.0756 23.3207 29.3194 23.5679C29.5631 23.8151 29.7001 24.1504 29.7001 24.5V34.4996L32.9963 31.1571C33.117 31.0347 33.2603 30.9376 33.418 30.8714C33.5757 30.8051 33.7448 30.771 33.9155 30.771C34.0862 30.771 34.2553 30.8051 34.413 30.8714C34.5707 30.9376 34.7141 31.0347 34.8348 31.1571ZM29.7001 10C27.0442 10.0023 24.4414 10.7537 22.1826 12.1702C19.9238 13.5867 18.0981 15.6124 16.9098 18.0208C15.4954 17.8104 14.0534 17.8979 12.6739 18.2778C11.2943 18.6578 10.0069 19.322 8.89184 20.2291C7.77681 21.1362 6.85819 22.2667 6.19331 23.5499C5.52844 24.8331 5.1316 26.2415 5.02757 27.6871C4.92355 29.1328 5.11456 30.5847 5.5887 31.9522C6.06283 33.3197 6.8099 34.5733 7.78327 35.6349C8.75663 36.6965 9.93537 37.5433 11.2459 38.1222C12.5564 38.7012 13.9706 39 15.4001 39H19.3001C19.6449 39 19.9756 38.8611 20.2194 38.6139C20.4632 38.3667 20.6001 38.0314 20.6001 37.6818C20.6001 37.3322 20.4632 36.9969 20.2194 36.7497C19.9756 36.5025 19.6449 36.3636 19.3001 36.3636H15.4001C13.3315 36.3636 11.3475 35.5304 9.88473 34.0471C8.42195 32.5639 7.60017 30.5522 7.60017 28.4545C7.60017 26.3569 8.42195 24.3452 9.88473 22.862C11.3475 21.3787 13.3315 20.5455 15.4001 20.5455C15.5792 20.5455 15.7576 20.5529 15.9354 20.5652C15.5794 21.8456 15.3993 23.1697 15.4001 24.5C15.4001 24.8496 15.5371 25.1849 15.7809 25.4321C16.0247 25.6793 16.3554 25.8182 16.7001 25.8182C17.0449 25.8182 17.3756 25.6793 17.6194 25.4321C17.8632 25.1849 18.0001 24.8496 18.0001 24.5C18.0003 22.6203 18.441 20.7676 19.2859 19.0944C20.1307 17.4213 21.3556 15.9757 22.8595 14.8767C24.3634 13.7777 26.1033 13.0568 27.9359 12.7733C29.7684 12.4899 31.6412 12.652 33.3998 13.2464C35.1585 13.8408 36.7526 14.8504 38.051 16.1921C39.3494 17.5337 40.3148 19.169 40.8676 20.9631C41.4205 22.7572 41.545 24.6589 41.2309 26.5114C40.9168 28.364 40.1731 30.1143 39.0611 31.6182C38.9571 31.7565 38.8811 31.9142 38.8376 32.0824C38.794 32.2506 38.7837 32.4259 38.8072 32.5981C38.8307 32.7704 38.8876 32.9362 38.9746 33.086C39.0616 33.2359 39.177 33.3668 39.3141 33.4712C39.4512 33.5757 39.6073 33.6516 39.7735 33.6946C39.9397 33.7376 40.1126 33.7468 40.2823 33.7217C40.452 33.6967 40.6151 33.6378 40.7623 33.5486C40.9094 33.4593 41.0377 33.3414 41.1398 33.2016C42.7332 31.0473 43.7036 28.4856 43.9422 25.8036C44.1807 23.1216 43.6781 20.4251 42.4905 18.0165C41.3029 15.6078 39.4772 13.582 37.2182 12.1661C34.9591 10.7503 32.3559 10.0002 29.7001 10Z"
            />
          </svg>
          <span class="text-base">从备份恢复</span>
        </button>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <div
          v-if="webDAVState !== '连接成功'"
          class="text-red-400"
        >
          <svg
            class="w-4 h-4"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.97 35.495L36.965 35.4898L19.8372 17.8327L19.8289 17.8239L12.6531 10.4262C12.5364 10.3013 12.3942 10.1994 12.235 10.1266C12.0758 10.0538 11.9027 10.0114 11.7259 10.002C11.549 9.99259 11.3719 10.0163 11.2049 10.0718C11.0379 10.1272 10.8844 10.2133 10.7533 10.325C10.6222 10.4367 10.5162 10.5717 10.4415 10.7222C10.3667 10.8728 10.3247 11.0357 10.3179 11.2017C10.3111 11.3676 10.3396 11.5331 10.4018 11.6885C10.4641 11.844 10.5587 11.9863 10.6803 12.1071L17.2206 18.8499L17.2106 18.8697C15.76 18.6708 14.2813 18.7543 12.8668 19.115C11.4522 19.4756 10.1321 20.1057 8.98894 20.9658C7.84578 21.8259 6.90406 22.8977 6.22258 24.1142C5.5411 25.3306 5.13449 26.6657 5.02812 28.036C4.92175 29.4064 5.11791 30.7825 5.60435 32.0786C6.0908 33.3747 6.85709 34.5629 7.85539 35.5691C8.85368 36.5752 10.0626 37.3777 11.4065 37.9265C12.7505 38.4752 14.2008 38.7584 15.6668 38.7584H30.3334C32.1461 38.7618 33.9436 38.4478 35.6332 37.8324L37.3469 39.5991C37.5856 39.8409 37.9167 39.9846 38.268 39.9988C38.6193 40.0131 38.9623 39.8967 39.2225 39.675C39.4826 39.4533 39.6388 39.1443 39.657 38.8152C39.6753 38.4861 39.5541 38.1636 39.3199 37.9179L36.97 35.495ZM30.3334 36.2591H15.6668C13.545 36.2591 11.5102 35.4692 10.0099 34.0631C8.50964 32.657 7.66679 30.7499 7.66679 28.7614C7.66679 26.7729 8.50964 24.8658 10.0099 23.4597C11.5102 22.0536 13.545 21.2637 15.6668 21.2637C15.8508 21.2637 16.0341 21.2707 16.2169 21.2824C15.8523 22.4963 15.6672 23.7514 15.6668 25.0125C15.6668 25.344 15.8072 25.6618 16.0573 25.8962C16.3073 26.1305 16.6465 26.2622 17.0001 26.2622C17.3537 26.2622 17.6928 26.1305 17.9429 25.8962C18.1929 25.6618 18.3334 25.344 18.3334 25.0125C18.3335 23.5933 18.6198 22.1868 19.1773 20.8672L33.6772 35.8158C32.5906 36.111 31.4647 36.2603 30.3334 36.2591V36.2591ZM45 25.0125C45.0023 28.3897 43.6758 31.6491 41.2743 34.167C41.0387 34.4141 40.708 34.5634 40.355 34.5821C40.0019 34.6007 39.6554 34.4871 39.3917 34.2663C39.128 34.0455 38.9687 33.7355 38.9488 33.4046C38.9289 33.0737 39.0501 32.749 39.2857 32.5018C41.2606 30.4276 42.3459 27.7415 42.3322 24.9615C42.3185 22.1816 41.2068 19.5049 39.2116 17.4479C37.2164 15.3908 34.4791 14.0992 31.5277 13.8221C28.5762 13.5451 25.6199 14.3023 23.2291 15.9476C22.9441 16.1403 22.5894 16.2197 22.2423 16.1686C21.8951 16.1175 21.5836 15.94 21.3753 15.6747C21.167 15.4095 21.0789 15.0779 21.13 14.7521C21.1812 14.4262 21.3676 14.1325 21.6486 13.9348C23.8338 12.4303 26.4213 11.523 29.1235 11.3136C31.8258 11.1042 34.5371 11.6009 36.9564 12.7485C39.3756 13.8962 41.408 15.6499 42.828 17.8148C44.2479 19.9798 44.9998 22.4713 45 25.0125V25.0125Z"
            />
          </svg>
        </div>
        <div
          v-if="webDAVState === '连接成功'"
          class="text-green-400"
        >
          <svg
            class="w-4 h-4"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.3329 10C27.609 10.0023 24.9393 10.7794 22.6225 12.2445C20.3056 13.7096 18.4329 15.8048 17.2138 18.296C15.7631 18.0787 14.2843 18.1695 12.8695 18.5628C11.4547 18.956 10.1344 19.6433 8.9909 20.5818C7.84745 21.5202 6.90542 22.6897 6.22363 24.0171C5.54184 25.3445 5.13491 26.8014 5.02826 28.2968C4.92161 29.7922 5.11752 31.2941 5.60377 32.7086C6.09001 34.1232 6.85615 35.42 7.85436 36.5182C8.85256 37.6164 10.0614 38.4924 11.4054 39.0914C12.7494 39.6905 14.1998 39.9998 15.6659 40H30.3329C34.2229 40 37.9535 38.4196 40.7041 35.6066C43.4547 32.7936 45 28.9782 45 25C45 21.0218 43.4547 17.2064 40.7041 14.3934C37.9535 11.5804 34.2229 10 30.3329 10ZM30.3329 37.2727H15.6659C13.5441 37.2727 11.5092 36.4107 10.0089 34.8763C8.50856 33.3419 7.66568 31.2609 7.66568 29.0909C7.66568 26.921 8.50856 24.8399 10.0089 23.3055C11.5092 21.7711 13.5441 20.9091 15.6659 20.9091C15.8495 20.9091 16.0325 20.9154 16.2149 20.928C15.8496 22.253 15.6648 23.6233 15.6659 25C15.6659 25.3617 15.8064 25.7085 16.0564 25.9642C16.3065 26.22 16.6456 26.3636 16.9993 26.3636C17.3529 26.3636 17.692 26.22 17.9421 25.9642C18.1922 25.7085 18.3326 25.3617 18.3326 25C18.3326 22.5727 19.0364 20.1999 20.355 18.1816C21.6737 16.1634 23.5479 14.5904 25.7406 13.6615C27.9334 12.7326 30.3463 12.4895 32.6741 12.9631C35.0019 13.4366 37.1402 14.6055 38.8185 16.3219C40.4967 18.0382 41.6396 20.225 42.1027 22.6057C42.5657 24.9864 42.3281 27.454 41.4198 29.6966C40.5115 31.9391 38.9734 33.8559 37 35.2044C35.0265 36.5529 32.7064 37.2727 30.3329 37.2727ZM36.6093 21.9903C36.7331 22.1169 36.8313 22.2672 36.8983 22.4327C36.9653 22.5981 36.9998 22.7755 36.9998 22.9545C36.9998 23.1336 36.9653 23.311 36.8983 23.4764C36.8313 23.6419 36.7331 23.7922 36.6093 23.9188L28.6091 32.1006C28.4853 32.2273 28.3383 32.3277 28.1765 32.3962C28.0147 32.4648 27.8413 32.5 27.6662 32.5C27.4911 32.5 27.3177 32.4648 27.1559 32.3962C26.9942 32.3277 26.8472 32.2273 26.7234 32.1006L22.7232 28.0097C22.5994 27.8831 22.5012 27.7328 22.4342 27.5673C22.3672 27.4019 22.3327 27.2245 22.3327 27.0455C22.3327 26.8664 22.3672 26.689 22.4342 26.5236C22.5012 26.3582 22.5994 26.2078 22.7232 26.0812C22.9733 25.8255 23.3125 25.6818 23.6661 25.6818C23.8412 25.6818 24.0146 25.7171 24.1764 25.7856C24.3382 25.8541 24.4851 25.9546 24.609 26.0812L27.6662 29.208L34.7236 21.9903C34.8474 21.8637 34.9944 21.7632 35.1561 21.6947C35.3179 21.6261 35.4913 21.5909 35.6664 21.5909C35.8415 21.5909 36.0149 21.6261 36.1767 21.6947C36.3385 21.7632 36.4855 21.8637 36.6093 21.9903Z"
            />
          </svg>
        </div>
        <span class="text-gray-400">{{ webDAVState }}</span>
      </div>
      <button
        v-show="!showWebDAVInfo && webDAVState !== '未添加'"
        class="px-1 py-0.5 text-xs text-white bg-green-400 hover:bg-green-600 rounded"
        @click="toggleWebDAVInfoHandler"
      >
        修改
      </button>
    </div>
    <div class="flex items-center text-gray-400 text-xs space-x-4">
      <span>最近备份时间</span>
      <span>{{ webDAVBackupTimeString }}</span>
    </div>
  </div>
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
  <WebdavFileModal
    v-if="showWebdavFileModal"
    v-model:show="showWebdavFileModal"
    :files-arr="webDAVFilesArr"
    @result="getRecoverIndexedDBResult"
  />
  <PromptModal
    v-if="showDeleteWebDAVConfirmModal"
    v-model:show="showDeleteWebDAVConfirmModal"
    @result="getDeleteWebDAVResult"
  >
    <template #title>
      <h2 class="p-4 text-xl font-bold">
        删除 webDAV 账号信息
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
  ref, computed, inject, onMounted,
} from 'vue';
import { exportDB, importInto } from 'dexie-export-import';
import useWebDAV from '../../composables/useWebDAV';
import WebdavFileModal from './Modal/WebdavFileModal.vue';
import PromptModal from './Modal/PromptModal.vue';

export default {
  components: {
    WebdavFileModal,
    PromptModal,
  },
  setup(props) {
    const {
      setWebDAVInfo, getWebDAVInfo, clearWebDAVInfo, setWebDAVSync, getWebDAVSync, getWebDAVLastFileState, createWebDAVClient, checkWebDAVConnect, getWebDAVFolder, getWebDAVFile, writeWebDAVFile,
    } = useWebDAV();

    const db = inject('db');

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
     * sync indexedDB by WebDAV
     */
    const showWebDAVInfo = ref(false);
    const webDAVState = ref('');

    const webDAVSync = ref('auto'); // auto, manual
    const webDAVUrl = ref('');
    const webDAVUsername = ref('');
    const webDAVPassword = ref('');
    const webDAVInfoIntegrity = computed(() => {
      if (!webDAVUrl.value || !webDAVUsername.value || !webDAVPassword.value) return false;
      return true;
    });

    const webDAVBakcupTime = ref(null);
    const webDAVBackupTimeString = computed(() => {
      if (!webDAVBakcupTime.value) return '无记录';
      const date = new Date(webDAVBakcupTime.value);
      return date.toLocaleString();
    });

    const webDAVClient = ref(null);

    // check the webDAV state by sending a request to webDAV server
    const getWebDAVState = async () => {
      if (!webDAVClient.value) return;
      const result = await checkWebDAVConnect(webDAVClient.value);
      showWebDAVInfo.value = !result.state;
      webDAVState.value = result.msg;
      if (webDAVState.value === '连接成功') {
        const lastFileState = await getWebDAVLastFileState(webDAVClient.value, '/tagdown_backup');
        if (lastFileState) webDAVBakcupTime.value = lastFileState.lastmod;
      } else {
        webDAVBakcupTime.value = null;
      }
    };

    // get webDAV data from chrome.storage
    const setWebDAVInfoHandler = async () => {
      // webDAV sync
      const webDAVSyncInit = await getWebDAVSync();
      if (webDAVSyncInit) webDAVSync.value = webDAVSyncInit;

      // webDAV information
      const webDAVInfo = await getWebDAVInfo();

      if (!webDAVInfo) {
        showWebDAVInfo.value = true;
        webDAVState.value = '未添加';
        webDAVBakcupTime.value = null;
      } else {
        webDAVUrl.value = webDAVInfo.url;
        webDAVUsername.value = webDAVInfo.username;
        webDAVPassword.value = webDAVInfo.password;
      }
    };

    onMounted(async () => {
      await setWebDAVInfoHandler();

      if (!webDAVUrl.value || !webDAVUsername.value || !webDAVPassword.value) return;
      webDAVClient.value = createWebDAVClient(webDAVUrl.value, webDAVUsername.value, webDAVPassword.value);
      getWebDAVState();
    });

    const toggleWebDAVInfoHandler = async () => {
      await setWebDAVInfoHandler();
      showWebDAVInfo.value = !showWebDAVInfo.value;
    };

    // set webDAV information
    const saveWebDAVInfoHandler = async () => {
      await setWebDAVSync(webDAVSync.value);
      await setWebDAVInfo(webDAVUrl.value, webDAVUsername.value, webDAVPassword.value);

      webDAVClient.value = createWebDAVClient(webDAVUrl.value, webDAVUsername.value, webDAVPassword.value);
      getWebDAVState();
    };

    // clear WebDAV information
    const showDeleteWebDAVConfirmModal = ref(false);
    const clearWebDAVInfoHandler = () => {
      showDeleteWebDAVConfirmModal.value = true;
    };

    const getDeleteWebDAVResult = async (value) => {
      if (value) {
        await clearWebDAVInfo();
        const webDAVInfo = await getWebDAVInfo();
        if (!webDAVInfo) {
          webDAVUrl.value = '';
          webDAVUsername.value = '';
          webDAVPassword.value = '';
          webDAVState.value = '未添加';
          webDAVBakcupTime.value = null;
        }
      }
    };

    // create a new database backup by webDAV
    const createDatabaseBackupHandler = async () => {
      const blob = await exportDB(db, {
        prettyJson: true,
      });
      if (!blob) return;
      const date = new Date();
      const filename = `tagdown_${date.getTime()}.json`;
      const result = await writeWebDAVFile(webDAVClient.value, '/tagdown_backup', filename, blob);
      setMsg(result.state, result.msg);
      if (result.state) {
        const lastFileState = await getWebDAVLastFileState(webDAVClient.value, '/tagdown_backup');
        if (lastFileState) webDAVBakcupTime.value = lastFileState.lastmod;
      }
    };

    // get the database backup files list in webDAV server
    const webDAVFilesArr = ref([]);
    const showWebdavFileModal = ref(false);
    const getDatabaseBackupHandler = async () => {
      webDAVFilesArr.value = await getWebDAVFolder(webDAVClient.value, '/tagdown_backup');
      showWebdavFileModal.value = true;
    };

    const getRecoverIndexedDBResult = async (value) => {
      if (!value.state || !value.filename) return;
      const file = await getWebDAVFile(webDAVClient.value, `/tagdown_backup/${value.filename}`);
      if (!file) return;
      const blob = new Blob([file], { type: 'application/json' });
      await importInto(db, blob, {
        overwriteValues: true,
      }).then(() => {
        setMsg(true, '成功');
      }).catch((err) => {
        console.log(err);
        setMsg(false, '失败');
      });
    };

    return {
      showMsg,
      msg,
      showWebDAVInfo,
      webDAVState,
      webDAVUrl,
      webDAVUsername,
      webDAVPassword,
      webDAVInfoIntegrity,
      webDAVSync,
      webDAVBackupTimeString,
      toggleWebDAVInfoHandler,
      saveWebDAVInfoHandler,
      clearWebDAVInfoHandler,
      showDeleteWebDAVConfirmModal,
      getDeleteWebDAVResult,
      createDatabaseBackupHandler,
      webDAVFilesArr,
      showWebdavFileModal,
      getDatabaseBackupHandler,
      getRecoverIndexedDBResult,
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

.input-style {
  @apply border-2 border-gray-100 rounded;
}

label,
button {
  user-select: none;
}
</style>
