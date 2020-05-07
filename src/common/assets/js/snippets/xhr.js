let xhr = new XMLHttpRequest();
xhr.open('post', api.uploadImage);
var loading = Loading.service({
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)',
  fullscreen: false
});
xhr.setRequestHeader('Authorization', 'Bearer' +' '+ storageMethod('local').get('token'));
xhr.setRequestHeader('App-Code', 16);
xhr.responseType = 'json';

xhr.onload = () => {
  if (xhr.status === 200) {
    const data = xhr.response.data;
    this.updateWarrentFile(data);
  } else {
    const error = xhr.response;
    this.$message({
      type: 'error',
      message: error.message
    });
  }
  if (loading != undefined) loading.close();
};
xhr.send(formdata);

let xhr = new XMLHttpRequest();
xhr.open('post', api.uploadImage);
var loading = Loading.service({
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)',
  fullscreen: false
});
xhr.setRequestHeader('Authorization', 'Bearer' +' '+ storageMethod('local').get('token'));
xhr.setRequestHeader('App-Code', 16);
xhr.responseType = 'json';

xhr.onload = () => {
  if (xhr.status === 200) {
    const data = xhr.response.data;
    if (data) {
      this.saveMchtDoc(data);
    }
  } else {
    const error = xhr.response;
    this.$message({
      type: 'error',
      message: error.message
    });
  }
  if (loading != undefined) loading.close();
};
xhr.send(formdata);
