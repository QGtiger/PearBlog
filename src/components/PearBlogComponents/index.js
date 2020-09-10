import QgFormItem from './packages/QgFormItem';
import QgInput from './packages/QgInput'
import QgCropDialog from './packages/QgCropDialog'

const components = [
  QgFormItem,
  QgInput,
  QgCropDialog
]

const install = function(Vue) {
    components.map(component => {
        Vue.component(component.name, component)
    })
}

if(typeof window !== 'undefined' && window.Vue){
    console.log(window.Vue)
    install(window.Vue)
}

export default {
    version: '1.0.1',
    name: 'PearBlogComponents',
    install
}