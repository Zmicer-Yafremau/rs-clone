import { Model } from '../../model/index';
import { Controller } from '../../controller';
import { getSelector } from '../../utils/utils';
import { FeedbackView } from './feedbackView';

export class RatingView {
    feedbackView: FeedbackView;
    constructor(private controller: Controller, private model: Model, private root: Element) {
        this.feedbackView = new FeedbackView(controller);
    }

    async render() {
        this.root.innerHTML = `<div class="rating log center">
        <div class="rating__wrapper center">
        <span class="rating-title">Сайт разрабатывается и улучшается с любовью для вас!</span>
        <span class="rating__svg">
        <svg width="250" height="250" viewBox="0 0 250 250" fill="none" style="width: 13rem; margin-top: 0.5rem; height: 13rem; background: none;">
        <path fill="#fff" fill-opacity="0.01" d="M0 0h1v1H0zM249 249h1v1h-1z">
        </path>
        <path d="M149.736 65.623c-9.554-3.565-18.84-5.606-29.934-5.001-15.77.86-27.46 7.452-32.807 11.367-7.987 5.848-11.518 14.89-12.227 24.768-1.191 16.653 9.77 32.228 25.587 37.55 14.804 4.979 30.541 3.748 44.974-1.779 13.865-5.307 23.735-14.264 24.648-33.459.934-19.581-13.612-30.976-20.241-33.447" fill="#FABBC1">
        </path>
        <path d="M82.073 76.623a27.473 27.473 0 014.922-4.636c2.512-1.838 6.414-4.262 11.481-6.41.022-7.013.124-9.702.124-16.91-.005-5.411.698-11.842.483-19.354-.177-6.22-.73-25.952-7.209-26.9-3.349-.49-6.704 10.375-8.502 28.362-1.674 16.797-1.927 32.423-1.32 45.858l.021-.01M149.735 65.619c2.211.824 5.303 2.643 8.411 5.426l.306.424c1.251-14.973.794-30.827.429-49.468-.247-12.573-2.995-20.983-5.947-21.001-2.689-.018-5.142 3.637-6.72 10.888-2.544 11.714-3.403 26.174-3.827 36.394-.295 7.092-.961 9.23-1.181 14.589a91.965 91.965 0 018.529 2.748" fill="#FABBC1">
        </path>
        <path d="M91.842 68.868c.58-7.585.413-12.735.789-24.826.531-17.305.494-30.23-.73-30.197-2.088.055-2.534 13.222-2.603 19.902-.145 14.495-.961 22.907-1.112 37.405a53.87 53.87 0 013.656-2.284M149.735 65.619c.838.312 1.804.767 2.851 1.365.88-5.613.923-7.753.966-13.433.069-9.701.145-15.122.214-24.823.038-4.994.51-18.02-1.46-18.423-1.975-.403-2.072 11.367-2.56 24.89-.102 2.909-.231 13.345-.413 15.98-.397 5.81-.8 8.05-1.197 13.86.531.19 1.063.382 1.599.584" fill="#F4EFE0">
        </path>
        <path d="M101.244 73.025a28.495 28.495 0 00-1.057 7.87c0 .671 1.041.671 1.036 0a27.678 27.678 0 011.02-7.593c.182-.648-.821-.921-.999-.277M113.286 80.905l-.225 8.233c-.022.671 1.02.67 1.041 0l.225-8.233c.022-.671-1.019-.67-1.041 0zM121.942 70.843c.086 2.368.107 4.736.075 7.107-.011.67 1.025.67 1.036 0 .037-2.37.011-4.739-.07-7.107-.027-.67-1.063-.671-1.041 0zM129.194 84.882a46.45 46.45 0 01.816 8.35c0 .67 1.041.67 1.036 0a47.984 47.984 0 00-.848-8.625c-.124-.658-1.127-.38-1.004.275M134.556 74.429c1.069 3.412 2.362 6.589 2.759 10.188.07.658 1.112.665 1.042 0-.408-3.694-1.702-6.96-2.802-10.465-.199-.638-1.202-.365-.999.277M146.488 68.964a42.447 42.447 0 013.709 7.678c.226.625 1.229.354 1.004-.277a43.87 43.87 0 00-3.816-7.925c-.349-.57-1.251-.049-.897.524zM145.725 88.78c.435 1.967.639 3.945.623 5.959-.011.671 1.03.671 1.036 0a27.138 27.138 0 00-.66-6.236c-.145-.655-1.149-.376-.999.277M103.435 122.172a25.83 25.83 0 01-1.207-5.871c-.059-.663-1.095-.667-1.041 0 .182 2.1.59 4.145 1.245 6.146.209.636 1.213.363 1.003-.275M154.645 80.662c1.584 2.727 2.587 5.552 2.668 8.73.016.669 1.052.671 1.036 0-.081-3.35-1.138-6.377-2.807-9.254-.339-.582-1.235-.058-.897.523zM163.595 82.409c1.218 2.697 1.755 5.588 2.307 8.478.124.656 1.128.378.999-.277-.569-2.989-1.149-5.94-2.41-8.728-.279-.61-1.17-.08-.896.527M165.429 100.017c-.274 2.578-.526 5.131-1.261 7.631-.188.644.816.917 1.004.275.762-2.589 1.014-5.236 1.299-7.906.069-.667-.972-.66-1.042 0zM157.255 106.598a73.642 73.642 0 01-1.261 8.934c-.134.655.869.933 1.003.277a77.034 77.034 0 001.299-9.211c.054-.669-.987-.662-1.041 0M146.837 104.461a27.252 27.252 0 01-.499 5.785c-.124.654.875.936 1.003.277a28.68 28.68 0 00.537-6.062c-.016-.669-1.052-.672-1.041 0M148.462 118.957a18.835 18.835 0 01-1.256 6.146c-.242.627.768.896 1.004.277a19.786 19.786 0 001.288-6.423c.027-.671-1.015-.669-1.036 0zM136.955 100.182c.059 3.464-.059 6.92-.343 10.373-.059.669.982.663 1.036 0a102.9 102.9 0 00.349-10.373c-.011-.669-1.052-.671-1.042 0zM138.64 122.4a99.342 99.342 0 01-.697 7.243c-.086.662.955.654 1.041 0 .316-2.406.553-4.821.698-7.243.037-.671-1.004-.667-1.042 0zM129.704 129.257a12.49 12.49 0 01-.247 3.988c-.145.652.853.931 1.003.276.322-1.407.419-2.825.285-4.264-.064-.661-1.106-.667-1.041 0M127.74 112.856v6.586c0 .671 1.041.671 1.041 0v-6.586c0-.672-1.041-.672-1.041 0zM116.738 105.111a68.92 68.92 0 00.134 7.74c.048.665 1.09.669 1.041 0a68.921 68.921 0 01-.139-7.74c.027-.669-1.009-.667-1.036 0zM120.944 92.766l.58 7.073c.054.666 1.095.67 1.041 0l-.579-7.073c-.054-.662-1.095-.669-1.042 0zM107.246 95.936a34.945 34.945 0 00-.199 10.964c.091.661 1.095.38 1.004-.277a33.2 33.2 0 01.198-10.41c.118-.657-.885-.935-1.003-.277M97.022 87.69a49.235 49.235 0 00-.897 9.682c.005.67 1.041.67 1.036 0a48.09 48.09 0 01.864-9.404c.124-.655-.875-.934-1.004-.277M84.096 82.73a33.55 33.55 0 00-3.14 8.65c-.14.654.864.933 1.003.276a32.524 32.524 0 013.033-8.402c.317-.592-.585-1.118-.896-.525zM86.932 98.057a24.341 24.341 0 00.193 8.344c.129.659 1.133.38 1.004-.276a22.76 22.76 0 01-.193-7.793c.096-.655-.907-.938-1.004-.275zM81.342 109.866a40.16 40.16 0 002.28 6.58c.275.613 1.171.085.897-.524a38.774 38.774 0 01-2.174-6.333c-.166-.65-1.164-.373-1.003.277M94.715 107.079a17.187 17.187 0 00.778 5.546c.199.638 1.202.366 1.004-.277a16.233 16.233 0 01-.741-5.269c.016-.671-1.025-.669-1.041 0M91.322 120.71c.757 2.787 2.372 5.127 4.675 6.857.537.402 1.052-.499.526-.898-2.083-1.565-3.516-3.725-4.198-6.236-.177-.646-1.18-.371-1.003.277M108.904 122.091c.317 2.695.966 5.262 1.755 7.853.194.64 1.197.367 1.004-.277-.762-2.5-1.417-4.973-1.717-7.576-.081-.659-1.117-.665-1.042 0M119.833 128.83a27.204 27.204 0 00.719 6.551c.151.654 1.154.375.999-.275a26.298 26.298 0 01-.682-6.276c.011-.671-1.031-.671-1.036 0M92.045 78.978c.07-2.127.493-4.16 1.25-6.146.242-.627-.762-.896-.998-.277a19.652 19.652 0 00-1.294 6.423c-.021.671 1.02.669 1.042 0zM108.074 73.541c.236-2.37.558-4.726.966-7.07.113-.658-.886-.937-1.004-.278a102.579 102.579 0 00-1.004 7.348c-.064.667.972.66 1.042 0M116.115 67.75a12.414 12.414 0 01.247-3.985c.15-.652-.854-.931-1.004-.277a13.543 13.543 0 00-.285 4.262c.065.663 1.106.67 1.042 0M141.788 72.623c-.752-2.607-1.825-5.026-3.028-7.45-.3-.6-1.197-.075-.901.524 1.164 2.343 2.2 4.683 2.93 7.203.183.642 1.186.369.999-.277M127.836 68.767a27.218 27.218 0 00-.719-6.552c-.156-.653-1.154-.378-1.004.277.483 2.068.709 4.15.682 6.275-.006.67 1.03.67 1.041 0" fill="#F6D6D9">
        </path>
        <path d="M125.84 96.266c-.982-.99-2.593-.97-3.951-.644-1.073.258-2.243.797-2.549 1.858-.29 1.026.354 2.069 1.036 2.889.842 1.017 2.63 2.19 2.63 2.19 1.229-.569 2.426-1.349 3.102-2.524.677-1.172.687-2.81-.268-3.77" fill="#211612">
        </path>
        <path d="M129.853 122.935c-.209 2.083-1.594 3.702-3.816 3.395-1.391-.19-2.319-1.436-2.646-2.713.45-7.139.821-14.262.284-21.403l-.671.34-.365-.249c.521 7.035.166 14.056-.274 21.087-.456 2.574-2.565 4.042-4.836 2.685-1.057-.629-1.309-2.085-1.288-3.205.011-.69-1.057-.688-1.068 0-.032 1.808.682 3.857 2.549 4.501 2.249.772 4.171-.34 5.132-2.215.773 1.362 2.152 2.228 3.832 2.288 2.539.089 4.004-2.248 4.235-4.511.064-.686-1.004-.678-1.068 0zM92.184 92.243c-1.476-.677-3.252 1.836-3.075 3.449.435 3.91 2.061 3.318 3.145 3.144 1.084-.176 1.53-1.437 1.455-2.922-.075-1.483-.032-2.985-1.525-3.67zM157.744 93.235c-.681-.738-1.733-.967-2.42-.243-.387.4-.601 1.026-.736 1.653-.359 1.672-.246 3.799 1.332 4.577 1.572.778 2.243-.619 2.646-1.995.402-1.374.032-3.065-.822-3.992" fill="#211612">
        </path>
        <path d="M90.206 105.958c-.87-1.984-2.845-3.396-5.33-3.337-1.637.038-3.102 1.071-4.213 2.274-.924.994-1.267 1.927-1.063 3.268.155 1.038 1.127 3.295 4.331 3.815 1.847.3 3.94.334 5.34-.904 1.262-1.118 1.81-3.132.935-5.116zM165.526 104.514c-.348-.505-.832-.898-1.331-1.25-1.503-1.061-3.397-1.823-5.169-1.322-1.256.355-2.233.827-3.193 2.18-.967 1.35-.741 3.945-.22 5.095.526 1.152 2.265 3.27 5.33 3.256 1.857-.009 4.696-1.396 5.491-3.782.477-1.429-.462-3.525-.908-4.177" fill="#F599A4">
        </path>
        <path d="M166.607 70.798c-11.857-20.144-36.858-33.369-47.067-33.16-10.209.21-28.142 15.66-39.478 32.24-10.032 14.672-12.077 33.347-9.683 59.087l.252-.124c1.927-.409 2.78 3.554 3.086 3.952.634-2.048 1.562-5.068 3.301-5.116 1.24-11.42 3.2-27.502 8.057-34.732 7.477-11.135 20.531-13.503 40.111-13.756 19.978-.26 29.736 5.313 34.175 10.347 5.266 5.957 9.839 21.253 11.835 39.007 1.718.612 3.575 3.78 3.575 3.78a6.16 6.16 0 012.034-4.118l.757-.49c-.252-13.146.215-37.936-10.955-56.917" fill="#F3608D">
        </path>
        <path d="M129.666 28.578c.842-.008 7.503-3.54 4.009-6.14-.687-.511-1.632-.432-2.474-.356-1.943.172-3.817.851-5.663 1.527 1.637-.97 2.871-2.738 3.306-4.737.161-.742.161-1.655-.392-2.114-.445-.373-1.068-.29-1.615-.14-3.215.885-6.001 3.527-7.273 6.91-.36-3.129.945-8.758-2.528-8.99-3.478-.228-3.72 5.991-3.296 9.497 0 0-3-8.297-6.795-6.58-3.789 1.715-4.428 8.428 4.138 12.025-2.372-.107-4.766.84-6.537 2.58-.934.917-1.745 2.292-1.369 3.608.456 1.58 3.092 2.897 8.212 1.093-1.052.7-4.17 6.159-1.476 6.77 2.7.614 5.915-2.009 7.187-4.867-.73 2.581-1.288 7.496 1.02 7.767 2.303.27 2.727-4.827 3.586-7.499.209 2.005 6.274 7.24 9.334 4.864 3.064-2.378-.156-6.764-2.958-9.141 1.208.768 6.382 1.168 7.343-1.322 1.267-3.276-4.187-4.23-5.759-4.755" fill="#B0E4D0">
        </path>
        <path d="M99.501 76.572c.575-1.342 1.122-2.76 1.895-4.006l.333.178 1.127.668c.623.377 1.245.771 1.905 1.09.586.283 1.101-.594.51-.879-.821-.398-1.594-.906-2.383-1.378-.429-.258-1.234-.925-1.798-.77-.58.162-.902 1.146-1.132 1.607a60.851 60.851 0 00-1.332 2.976c-.257.599.623 1.116.875.514zm10.601-2.821c.966-.837 1.519-2.068 2.217-3.115l3.172 2.022c.591.275 1.111-.604.515-.878-1.299-.603-2.334-1.99-3.821-2.142-.537-.057-.838.619-1.063.986-.515.83-.993 1.76-1.739 2.408-.494.432.231 1.147.719.719zm6.388-5.783c.81-.958 1.631-1.925 2.533-2.798l.274.193.724.663c.499.476 1.004.988 1.407 1.552.375.529 1.256.02.874-.514-.45-.64-1.003-1.208-1.561-1.758-.382-.382-1.122-1.248-1.745-1.223-.515.022-.886.552-1.208.894a51.097 51.097 0 00-2.018 2.27c-.418.499.295 1.222.72.721zm-11.444 1.32c.505-.976 1.009-1.95 1.508-2.923.838.498 1.675.995 2.507 1.492.563.338 1.079-.543.515-.88-.987-.587-1.98-1.176-2.968-1.765l-.692.182c-.586 1.127-1.165 2.253-1.745 3.38-.301.58.574 1.097.875.513zm29.258 4.254c.682-.498 1.412-.932 2.142-1.354l1.009-.547.402-.197.102-.073.006.02c.869.906 1.159 2.283 1.959 3.248.424.503 1.138-.22.719-.72-.783-.942-1.127-3.062-2.361-3.543-.489-.19-1.171.296-1.573.508a23.036 23.036 0 00-2.92 1.778c-.521.382-.016 1.266.515.88zm-41.335.046c.408-.667.57-1.519.832-2.25.252-.694.354-.704 1.1-.53.763.178 1.482.565 2.19.896.585.279 1.106-.598.51-.88-.805-.379-3.29-1.841-4.138-.945-.821.864-.773 2.217-1.374 3.195-.344.56.537 1.072.88.514zm81.919 36.026a100.898 100.898 0 00-1.793-12.355c-.107-.514-.891-.296-.789.216a98.404 98.404 0 011.771 12.139c.043.52.859.524.811 0zm-2.448-20.867a13.802 13.802 0 00-.859 1.544 27.125 27.125 0 00-1.969-1.08l-.408.702c.654.327 1.352.697 2.023 1.114-.279.615-.547 1.233-.848 1.844l.703.41c.29-.59.553-1.192.822-1.788.504.358.976.738 1.363 1.177l.574-.575c-.445-.506-.998-.944-1.578-1.349.263-.543.542-1.08.88-1.588l-.703-.411zm-2.662 10.21a82.123 82.123 0 011.943 9.988c.07.514.88.52.816 0a83.533 83.533 0 00-1.975-10.207c-.135-.508-.918-.291-.784.218zm-47.62-26.175a53.11 53.11 0 011.234-1.764l.854-1.089.332-.37.21-.183c1.17.946 2.163 2.2 3.166 3.307.446.487 1.16-.234.72-.72-.72-.794-1.45-1.587-2.196-2.363-.37-.384-1.057-1.334-1.674-1.334-.693 0-1.272.927-1.643 1.39-.671.838-1.283 1.722-1.884 2.612-.365.545.516 1.055.881.514zm44.126 21.666c.316-.499.638-1 .961-1.502.558.328 1.111.661 1.653 1.026l.408-.703a28.408 28.408 0 00-1.627-1.009c.355-.547.703-1.095 1.052-1.642l-.703-.411c-.349.547-.698 1.095-1.052 1.643a28.194 28.194 0 00-1.964-1.006l-.414.703c.666.304 1.305.64 1.943.99-.322.502-.644 1.001-.96 1.502l.703.41zM85.315 78.655c-.016-.969.102-1.907.295-2.844.902.384 1.798.77 2.7 1.154.596.253 1.111-.623.51-.88l-3.333-1.425-.746.303a13.815 13.815 0 00-.446 3.692c.011.655 1.03.657 1.02 0zm-2.27 8.584c.128-1.814.252-3.606.789-5.343 1.17.642 2.41 1.154 3.558 1.842l.408-.703c-1.293-.776-2.721-1.302-4.015-2.08l-.596.243c-.703 1.955-.815 3.987-.955 6.041-.037.524.773.52.81 0zm7.852-6.434c.091-1.294.419-2.555.59-3.838 1.192.528 2.422.98 3.597 1.552.585.286 1.1-.591.51-.879-1.396-.682-2.877-1.164-4.273-1.846l-.767.44c-.102 1.54-.564 3.03-.671 4.571-.043.655.971.65 1.014 0zm-17.922 40.26l-.048 4.948c-.006.527.805.525.81 0 .022-1.649.038-3.297.054-4.948.005-.525-.81-.525-.816 0zm-2.066.029a15.685 15.685 0 00-.027 4.858c.075.518.859.298.784-.216-.22-1.481-.21-2.949.032-4.425.08-.514-.703-.735-.79-.217zm58.726-52.99l1.357-1.281.784-.68.365-.466 1.143 1.284c.414.503.816 1.017 1.213 1.531.403.518 1.117-.207.72-.717a72.554 72.554 0 00-1.557-1.947c-.268-.318-.805-1.162-1.32-1.124-.575.04-1.052.527-1.471.877-.682.566-1.32 1.185-1.954 1.804l.72.72zm47.722 49.186l-.027-.812a26.872 26.872 0 01-5.663.442c-.091-.602-.182-1.204-.289-1.804l.085.027c1.927-.172 3.86-.341 5.792-.514l-.038-.809c-1.916.17-3.837.339-5.754.51l-.209.109c-1.412-7.883-3.779-15.57-7.439-22.812a23.257 23.257 0 00-1.857-3.042c3.746-.602 7.396-1.684 10.965-2.961l-.252-.774c-3.65 1.306-7.386 2.416-11.223 3.003-6.114-7.969-16.452-10.874-26.484-11.839-17.31-1.667-34.792-1.273-47.196 10.099-1.562 1.43-2.91 3.014-4.106 4.692a79.214 79.214 0 01-11.857-1.894l-.182.792c3.81.911 7.654 1.507 11.545 1.859-4.595 6.834-6.607 15.292-7.574 23.775-2.023-.143-4.052-.284-6.075-.426l.021.815c1.986.139 3.972.28 5.963.418-.053.485-.096.969-.145 1.454a3685.8 3685.8 0 00-5.754-.206l.033.814c1.884.067 3.768.134 5.646.203-.349 4.036-.515 8.001-.66 11.779.252-.59.542-1.127.875-1.561.67-15.164 1.964-30.128 12.887-41.604 4.139-4.353 9.603-7.315 16.988-8.94 10.558-2.326 23.864-2.1 32.688-.795 14.901 2.198 23.134 8.766 28.486 22.488 3.612 9.272 5.131 19.288 5.512 29.275l.8.727c-.156-4.035-.489-8.063-1.068-12.048a27.716 27.716 0 005.566-.44zm-3.806 4.337c.108 1.16.215 2.32.328 3.48.048.518.859.525.81 0-.107-1.16-.22-2.32-.327-3.48-.048-.518-.864-.524-.811 0zm2.174-.027c.016 1.204.027 2.406.043 3.61.005.524.821.524.816 0-.016-1.204-.032-2.406-.043-3.61-.011-.525-.821-.525-.816 0zm-99.33-25.27c.558-.34 1.089-.715 1.636-1.068l1.08 1.45.702-.411c-.37-.493-.735-.986-1.105-1.48.6-.396 1.218-.765 1.808-1.176l-.413-.703c-.612.428-1.256.814-1.878 1.225l-.897-1.2-.703.412.918 1.23c-.52.334-1.03.695-1.562 1.018l.413.703zm-4.81-.682c.569-.346 1.133-.69 1.702-1.034.187.507.36 1.021.472 1.563.112.514.896.296.784-.216a11.65 11.65 0 00-.537-1.784c.488-.295.977-.593 1.465-.89l-.408-.703-1.4.851-.629-1.235-.703.409.633 1.25c-.595.36-1.191.723-1.792 1.084l.413.705zm70.411-25.186c1.063-.644 2.077-1.385 3.193-1.93l.017-.006.161.275.456.929c.3.648.58 1.305.912 1.936.306.58 1.181.065.875-.513-.418-.794-.762-1.624-1.143-2.432-.204-.43-.51-1.236-1.084-1.265-.585-.027-1.224.464-1.696.743-.741.445-1.46.936-2.201 1.386-.564.338-.048 1.219.51.877zm11.492 3.346c1.009-.485 2.018-.974 3.032-1.458.618.984.757 2.333.988 3.425.134.642 1.116.37.982-.27-.306-1.433-.483-2.991-1.422-4.17l-.618-.078c-1.159.552-2.318 1.118-3.478 1.672-.59.281-.075 1.158.516.879zm-7.493 2.775c1.105-.667 2.265-1.097 3.472-1.498a20.673 20.673 0 011.777 3.3c.247.596 1.235.333.982-.271a22.769 22.769 0 00-2.098-3.903l-.575-.233c-1.427.461-2.78.948-4.074 1.726-.558.338-.048 1.217.516.879zm-70.427 24.105c-1.127 3.491-1.605 7.16-1.788 10.814-.026.527.79.525.816 0 .172-3.585.65-7.172 1.755-10.597.161-.502-.622-.713-.783-.217zm79.895-20.677l4.476-1.343c.559 1.504 1.111 3.01 1.664 4.516.226.61 1.208.346.983-.27-.612-1.668-1.23-3.338-1.842-5.005l-.628-.357c-1.642.493-3.279.986-4.921 1.477-.628.189-.36 1.17.268.982zM72.508 99.736c-.6 3.843-1.079 7.701-1.438 11.573-.048.524.767.518.816 0 .349-3.801.815-7.585 1.406-11.357.08-.514-.703-.734-.784-.216" fill="#D7144E">
        </path>
        <path d="M186.91 136.026c-.397-1.12-3.414-.778-4.755-.453.316-.457 2.265-2.679 1.111-3.872-1.154-1.194-2.706.474-3.822 1.603.483-1.733.623-5.297-1.396-5.653l-1.245.555a6.16 6.16 0 00-2.034 4.118s-2.679-4.621-4.579-3.826c-1.9.793-.907 4.525.457 6.679a21.073 21.073 0 00-3.162-.839l-1.181.019c-.569.23-.853.902-.859 1.518-.01 1.049.612 2.031 1.444 2.666.832.636 1.857.972 2.877 1.204-.816.296-1.658.611-2.254 1.24-.596.627-.854 1.67-.338 2.366.483.65 1.454.757 2.211.466.752-.292 1.337-.892 1.9-1.475-.37 1.894-.692 5.513 1.305 5.958 2.002.446 3.011-2.918 3.692-5.117.306.399 1.16 4.361 3.087 3.95 1.932-.409 1.395-4.061 1.084-5.418a7.578 7.578 0 002.233 2.333l.928.306c.553-.091.8-.743.865-1.299a5.91 5.91 0 00-1.192-4.243 4.258 4.258 0 003.119-1c.52-.449.73-1.14.504-1.786M63.09 139.944c.397 1.121 3.414.778 4.755.454-.322.457-2.265 2.676-1.116 3.872 1.154 1.193 2.71-.474 3.827-1.603-.488 1.733-.623 5.295 1.39 5.653l1.25-.558a6.144 6.144 0 002.035-4.116s2.679 4.622 4.579 3.826c1.9-.792.901-4.524-.457-6.678a21.07 21.07 0 003.162.839l1.18-.019c.57-.233.854-.902.86-1.521.01-1.047-.612-2.028-1.444-2.664-.832-.635-1.858-.971-2.877-1.206.816-.294 1.658-.608 2.254-1.237.596-.627.848-1.67.338-2.367-.483-.65-1.454-.759-2.211-.465-.752.291-1.342.891-1.9 1.474.37-1.894.692-5.514-1.31-5.957-2.002-.447-3.006 2.918-3.687 5.116-.306-.398-1.16-4.361-3.087-3.952-1.932.411-1.395 4.063-1.084 5.418a7.652 7.652 0 00-2.233-2.33l-.934-.308c-.547.092-.8.744-.859 1.3a5.909 5.909 0 001.192 4.243 4.254 4.254 0 00-3.118 1.001c-.521.447-.73 1.139-.505 1.785" fill="#B0E4D0">
        </path>
        <path d="M145.844 132.32l-.515.207c-14.433 5.527-30.171 6.758-44.974 1.779a37.24 37.24 0 01-2.437-.936c-2.501 8.961-6.264 28.012-7.939 46.148-1.803 19.577-.574 28.691 7.23 37.373 6.447 7.187 16.87 8.453 29.178 7.954 12.313-.499 22.141-2.234 27.686-11.765 5.346-9.194 4.492-23.124 2.05-36.438-2.104-11.499-7.155-34.321-10.279-44.322" fill="#FABBC1">
        </path>
        <path d="M113.612 224.463c-6.699-.871-12.34-3.046-16.403-7.572-.5-.548-.961-1.102-1.407-1.66-.016 5.452.027 10.832.601 17.163.264 2.868 1.632 8.468 4.536 11.288 3.408 3.307 10.418 5.906 14.455 2.508 3.043-2.567-.322-7.211-1.224-13.704-.37-2.664-.537-5.344-.558-8.023M136.139 223.972c-.006 4.693-.537 8.737-3.613 12.765-2.082 2.722-4.299 6.701-1.996 9.349 4.396 5.063 15.764 1.063 19.875-9.962.698-1.869 2.545-10.321 3.253-22.409-3.993 6.375-10.032 9.066-17.519 10.257" fill="#FABBC1">
        </path>
        <path d="M145.842 132.321l-.515.207c-14.433 5.527-30.171 6.758-44.975 1.779a37.356 37.356 0 01-2.437-.936c-2.5 8.961-6.263 28.012-7.938 46.148-1.009 10.96-.95 21.092.445 24.798 13.72 9.295 52.661 10.117 66.617.81 1.986-6.314.896-18.596-.918-28.484-2.104-11.499-7.155-34.321-10.279-44.322" fill="#2D8565">
        </path>
        <path d="M149.264 132.327c-1.218-4.076-15.727 3.105-28.77 2.895-14.17-.227-24.77-5.502-26.338-1.769-1.573 3.734-2.62 13.398-1.004 15.867 1.61 2.467 17.477 4.029 29.42 3.635 13.279-.438 25.474-1.762 27.734-4.994 1.857-2.656.177-11.556-1.042-15.634" fill="#EE2341">
        </path>
        <path d="M135.749 133.152c.719 6.27 1.068 12.55 1.057 18.854l.902-.109a162.045 162.045 0 00-1.079-18.948l-.88.203zm-5.888 1.206a119.62 119.62 0 011.401 18.151l.901-.065a121.453 121.453 0 00-1.417-18.242l-.885.156zm11.175-2.426a151.528 151.528 0 011.637 19.197l.896-.187a152.244 152.244 0 00-1.653-19.197l-.88.187zm-15.732 3.066c.671 5.928.907 11.856.719 17.816l.907-.042a124.315 124.315 0 00-.735-17.878l-.891.104zm20.885-3.909l-.913.083a72.673 72.673 0 012.298 18.598l.912-.416c0-6.171-.762-12.244-2.297-18.265zm-47.052 20.405l.902.166a82.39 82.39 0 012.233-18.868l-.891-.162a83.254 83.254 0 00-2.244 18.864zm-2.099-19.369c-1.765 5.95-2.528 12.002-2.238 18.234l.913.323c-.333-6.324.445-12.487 2.254-18.524l-.928-.033zm24.321 3.081l-.865.015h-.037c-.258 5.93-.231 11.851.08 17.779l.902-.021a185.155 185.155 0 01-.08-17.773zm-17.386 17.001l.902.095a97.715 97.715 0 012.206-18.59l-.886-.163a98.44 98.44 0 00-2.222 18.658zm5.556.493l.901.059c-.026-6.129.183-12.238.843-18.342l-.891-.132c-.671 6.13-.88 12.261-.853 18.415zm5.469.258l.902.023c0-5.997.252-11.977.746-17.953l-.896-.069c-.5 5.99-.752 11.988-.752 17.999z" fill="#F3608D">
        </path>
        <path d="M140.504 160.485a3.932 3.932 0 01-.467 2.083c-.703 1.299-1.997 2.22-3.355 2.899-2.565 1.278-5.459 1.848-8.341 2.094-7.439.629-19.478-1.106-22.667-5.06l-.177-.354c.741 4.516 1.557 11.222 3.312 15.392 1.776 4.22 3.242 8.124 7.321 10.192 1.637.833 3.741 1.773 3.773 3.615 3.774 1.38 7.939.944 11.873.1.387-1.697 1.514-2.806 2.63-4.21 1.616-2.035 3.242-2.781 4.702-6.808 2.362-6.532 2.738-13.144 1.396-19.943" fill="#ABD5D6">
        </path>
        <path d="M130.203 183.311c-.896-.971-1.948-2.228-3.102-3.528.944-.032 2.206-.172 2.845-.585-1.052-.827-2.11-2.136-3.167-2.96a15.154 15.154 0 002.055-.552 93.056 93.056 0 00-3.923-4.709c-1.439 1.905-4.128 5.206-4.128 5.206a35.35 35.35 0 012.501.03c-1.159.985-2.989 3.006-3.886 4.237.628.069 2.099.107 3.221-.099-.982.833-2.346 2.654-2.764 3.583 1.433.097 2.866.102 4.299.048 0 .602-.129 1.336.005 1.928.736.006 1.401-.172 2.029-.21-.225-.541-.22-1.246-.365-1.821a39.481 39.481 0 004.38-.568" fill="#fff">
        </path>
        <path d="M110.65 181.709c-3.478.547-5.019.101-5.948-.801l-.826-1.295c-1.235-2.529-2.399-5.741-.666-7.958.843-1.085 2.153-1.583 3.527-1.871-.145-.799-.285-1.598-.414-2.387-2.039.333-4.642 1.261-5.426 2.504-1.084 1.725-1.417 3.474-.671 6.501.644 2.599 1.862 5.613 4.068 7.132 2.126 1.466 5.234 1.057 7.832.688a18.825 18.825 0 01-1.476-2.513z" fill="#ABD5D6">
        </path>
        <path d="M139.646 158.481c-.875-.869-5.561-2.4-11.272-2.57-5.716-.168-12.925.405-20.45 3.43-.703.285-1.428.597-1.933 1.145-.499.549-.783 1.435-.316 2.016 3.188 3.954 15.227 5.689 22.667 5.06 2.882-.246 5.775-.817 8.341-2.094 1.358-.679 2.652-1.6 3.355-2.899.703-1.298.671-3.033-.392-4.088" fill="#fff">
        </path>
        <path d="M138.759 159.758c-.612-1.08-4.536-1.894-5.899-2.018-5.405-.491-8.54-.323-13.956.258-4.83.516-7.525 1.168-8.899 1.672-.671.245-3.8 1.172-1.836 2.842 1.686 1.43 7.858 3.094 11.594 3.348 3.741.253 7.289.276 11.009-.185 2.63-.327 5.732-1.227 7.38-3.077.714-.801 1.122-1.936.607-2.84" fill="#ABD5D6">
        </path>
        <path d="M137.733 162.997l-.07-.085c-.386-.363-.88-.585-1.374-.771-3.102-1.171-6.511-1.102-9.822-1.018-4.756.122-9.538.246-14.197 1.2-.983.202-1.97.455-2.845.948 2.512 1.206 7.251 2.379 10.338 2.589 3.741.253 7.289.276 11.008-.185 2.426-.302 5.244-1.103 6.962-2.678" fill="#38273F">
        </path>
        <path d="M102.79 172.084c-2.587-1.84-11.207-1.653-12.238-5.171-.29-.981.703-1.988 1.304-2.909a334.47 334.47 0 012.244-13.503c-7.895 2.081-16.15 7.957-16.13 17.104.017 7.266 5.556 13.52 20.161 14.002 7.606.247 8.508-6.79 4.659-9.523M150.346 149.295a541.551 541.551 0 013.043 13.587c.655.257 1.245.891.843 2.588-.741 3.148-13.392 5.08-15.485 9.495-1.262 2.663.166 6.019 4.347 6.577 4.928.65 19.211-.741 22.56-11.573 3.188-10.318-3.816-17.445-15.308-20.674z" fill="#FABBC1">
        </path>
        </svg>
        </span>
        <span class="rating-text">
        Нам интересно Ваше мнение по качеству реализации сайта. 
        <br>
        Оцените и напишите Ваш честный личный отзыв.
        <br><br>
        Ваши оценки и отзывы позволяют сайту развиваться, спасибо!
        </span>
        <div class="rating-new center">
        <div class="rating-star">
        <span class="star rating-item active" data-rate="1"></span>
        <span class="star rating-item" data-rate="2"></span>
        <span class="star rating-item" data-rate="3"></span>
        <span class="star rating-item" data-rate="4"></span>
        <span class="star rating-item" data-rate="5"></span>
        </div>
        <form class="form-group form-rating rating-feedback">
        <label for="formFeedbackTextarea">Оставьте свой отзыв тут:</label>
        <textarea name="form-control" class="form-control" id="formFeedbackTextarea" required rows="4"></textarea>
        <div class="center"> 
        <button type="submit" class="btn main__button active rating__btn center mt-4">Отправить</button>
        </div>
        </form>
        </div>
        </span>
        </div>
        <div class="feedback__wrapper">
        </div>
        `;

        const feedbackWrapper = document.querySelector('.feedback__wrapper') as HTMLDivElement;
        this.feedbackView.render(feedbackWrapper);

        const rating = document.querySelector('.rating-star') as Element;
        const items = getSelector('.rating-item') as NodeListOf<HTMLSpanElement>;
        let currentNumber = 1;

        rating.addEventListener('mouseover', (e: Event) => {
            const target = e.target as Element;
            if (target.classList.contains('rating-item')) {
                const hoverItem = target as Element;
                [].forEach.call(items, function itemsHover(elem: Element, i) {
                    if (i < Number(hoverItem.getAttribute('data-rate') || 0)) {
                        elem.classList.add('active');
                    } else if (i >= Number(hoverItem.getAttribute('data-rate') || 0)) {
                        elem.classList.remove('active');
                    }
                    elem.classList.remove('item-current');
                });
            }
        });

        rating.addEventListener('mouseout', () => {
            [].forEach.call(items, function (elem: Element, i) {
                if (elem.classList.contains('item-current')) {
                    currentNumber = i + 1;
                }
            });
            if (currentNumber !== undefined) {
                clearWithoutCurrent(currentNumber);
                return;
            } else {
                clear();
            }
        });

        rating.addEventListener('click', (e: Event) => {
            const target = e.target as Element;
            target.classList.add('item-current');
            const targetNode = target.parentNode as Element;
            const siblings = targetNode.querySelectorAll('.rating-item') as NodeListOf<Element>;
            [].forEach.call(siblings, function (el: Element) {
                if (el !== target) {
                    el.classList.remove('item-current');
                }
            });
        });

        function clear() {
            [].forEach.call(items, function (elem: Element) {
                if (elem.getAttribute('data-rate') !== '1') {
                    elem.classList.remove('active');
                }
            });
        }

        function clearWithoutCurrent(currentNumber: number) {
            [].forEach.call(items, function (elem: Element, i) {
                if (i < currentNumber) {
                    elem.classList.add('active');
                }
            });
        }

        const ratingButton = document.querySelector('.form-rating') as HTMLFormElement;
        const textFeedback = document.querySelector('.form-control') as HTMLTextAreaElement;
        const userName: string = localStorage.getItem('name') || 'Гость';
        const userId = Number(localStorage.getItem('id')) || null;
        let text: string;
        textFeedback.addEventListener('input', function handleChange(event) {
            const target = event.target as HTMLTextAreaElement;
            text = target.value;
        });

        ratingButton.addEventListener('submit', async (e: SubmitEvent) => {
            if (!ratingButton.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                e.preventDefault();
                e.stopPropagation();
                await this.controller.createFeedback(currentNumber, text, userName, userId);
                currentNumber = 1;
                clear();
                textFeedback.value = '';
                this.feedbackView.render(feedbackWrapper);
            }
        });
    }

    async getAll() {
        const feedbackAll = await this.controller.getAll();
        return feedbackAll;
    }
}
