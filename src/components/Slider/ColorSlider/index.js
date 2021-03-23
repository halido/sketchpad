import colorList from './colorList.js';
import Slider from '@/components/Slider';
import s from './index.less';

class MainColorSlider extends Slider {
    constructor({ height = 40 }) {
        super()

        this.sliderBoxEl.classList.add(s.sliderBox);

        this.sliderEl.classList.add(s.slider);


        //定义canvas背景
        const canvasEl = document.createElement('canvas');
        canvasEl.width = colorList.length;
        canvasEl.height = 10;
        canvasEl.className = s.canvas;
        const canvasCtx = canvasEl.getContext('2d');

        const colorSliderBoxEl = document.createElement('div');
        colorSliderBoxEl.className = s.colorSliderBox;
        // colorSliderBoxEl.classList.add(s.mainColorSliderBox);
        colorSliderBoxEl.style.height = height + 'px';

        colorSliderBoxEl.appendChild(canvasEl);
        colorSliderBoxEl.appendChild(this.sliderBoxEl);


        const ctx = canvasCtx;
        ctx.save();
        colorList.forEach(function (item, index) {
            ctx.beginPath();
            ctx.moveTo(index, 0);                //移动笔触
            ctx.lineTo(index, 10);                 //绘制线条路径
            ctx.strokeStyle = `rgb(${item[0]},${item[1]},${item[2]})`;
            ctx.closePath();
            ctx.stroke();
        })
        ctx.restore();

        //绑定事件
        colorSliderBoxEl.addEventListener('sliderChange', (e) => {
            e.stopPropagation();
            const color = colorList[Math.round(colorList.length * e.detail)];

            const event = document.createEvent('CustomEvent');
            //发出自定义事件 传递rgb字符串
            event.initCustomEvent('mainColorSliderChange', true, false, color);
            colorSliderBoxEl.dispatchEvent(event);
        })
        this.El = colorSliderBoxEl;//暴露节点

    }
}

class ColorSlider {
    constructor({ height }) {
        const colorSliderContainer = document.createElement('div');
        colorSliderContainer.className = s.colorSliderContainer;
        const mainColorSlider = new MainColorSlider({ height });

        colorSliderContainer.appendChild(mainColorSlider.El);


        colorSliderContainer.addEventListener('mainColorSliderChange', function (e) {
            e.stopPropagation();
            const color = e.detail
            const rgb = `rgb(${color[0]},${color[1]},${color[2]})`

            const event = document.createEvent('CustomEvent');
            //发出自定义事件 传递rgb字符串
            event.initCustomEvent('colorSliderChange', true, false, rgb);
            colorSliderContainer.dispatchEvent(event);



        })

        this.El = colorSliderContainer;
    }
}





module.exports = ColorSlider;