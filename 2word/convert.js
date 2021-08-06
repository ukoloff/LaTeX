setTimeout(init)

function init() {
  'use strict';

  var [src, dst] = document.forms[0].getElementsByTagName('textarea')
  var [res] = document.forms[0].getElementsByTagName('div')

  src.focus()
  src.oninput = update
  setTimeout(update, 112)

  document.forms[0].getElementsByTagName('button')[0].onclick = selectAll

  var prev
  function update() {
    if (prev == src.value) return
    prev = src.value

    katex.render(prev, res, {
      displayMode: true,
      throwOnError: false,
    })
    var [math] = res.getElementsByTagName('math')
    dst.value = math ? math.outerHTML : ''
  }

  function selectAll() {
    dst.select()
  }
}
