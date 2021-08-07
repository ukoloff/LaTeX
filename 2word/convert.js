setTimeout(init)

function init() {
  'use strict';

  var form = document.forms[0]

  var [src, dst] = form.getElementsByTagName('textarea')
  var [res] = form.getElementsByTagName('p')

  src.focus()
  src.oninput = update
  setTimeout(update, 112)

  var rbs = form['m']
  for (var rb of rbs) {
    rb.onclick = forceUpdate
  }

  form.getElementsByTagName('button')[0].onclick = selectAll

  var prev
  function update() {
    var value = src.value.trim()
    if (prev === value) return
    prev = value

    var mode = !rbs[0].checked

    katex.render(prev, res, {
      displayMode: mode,
      throwOnError: false,
    })
    var [math] = res.getElementsByTagName('math')
    dst.value = math ? math.outerHTML : ''
  }

  function selectAll() {
    dst.select()
  }

  function forceUpdate() {
    prev = false
    update()
  }
}
