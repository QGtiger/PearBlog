import QgCropDialog from './src/main'

QgCropDialog.install = function(Vue){
    Vue.component(QgCropDialog.name, QgCropDialog)
}

export default QgCropDialog;