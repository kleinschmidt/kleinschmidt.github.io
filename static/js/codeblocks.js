// modified from the gohugoioTheme source found at:
// https://github.com/gohugoio/hugoDocs/blob/4666d0a180db82e7b80791f881d3a4dccc3b85c5/themes/gohugoioTheme/src/js/codeblocks.js


// MIT License
// 
// Copyright (c) 2017 Bud Parr
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE

document.addEventListener("DOMContentLoaded", function(){ 

  let article = document.getElementById('content');

  if (article) {
    let codeBlocks = article.getElementsByTagName('code');
    for (let codeBlock of codeBlocks){
      if (codeBlock.clientWidth > 0 && codeBlock.scrollWidth > codeBlock.clientWidth) {
        codeBlock.parentNode.parentNode.classList.add('expand');
      }
    }
  }

});
