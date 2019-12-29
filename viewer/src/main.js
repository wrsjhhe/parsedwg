import Vue from 'vue';
import Viewport from './script/Viewport.vue';

import './style/common.scss';

new Vue({
    el: '#app',
    template: '<Viewport/>',
    components: { Viewport }
})