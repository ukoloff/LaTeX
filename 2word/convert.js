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
  var modeMatchers = [
    /^\\\[\s*(.*?)\s*\\\]$/s,
    /^\\\(\s*(.*?)\s*\\\)$/s,
    /^[$]{2}(?![$])\s*(.*?)\s*[$]{2}$/s,
    /^[$](?![$])\s*(.*?)\s*[$]$/s
  ]
  function update() {
    var value = src.value.trim()
    if (prev === value) return
    prev = value

    var mode  //LaTeX mode: inline / display
    for (var re of modeMatchers) {
      mode = !mode
      var m = re.exec(value)
      if (!m) continue
      convert(m[1], mode)
      allowMode(false)
      return
    }
    convert(value, !rbs[0].checked)
    allowMode(true)
  }

  function convert(latex, mode) {
    katex.render(latex, res, {
      displayMode: mode,
      throwOnError: false,
    })
    var [math] = res.getElementsByTagName('math')
    dst.value = math ? math.outerHTML : ''
  }

  function allowMode(enable) {
    for (var rb of rbs) {
      rb.disabled = !enable
    }
  }

  function selectAll() {
    dst.select()
  }

  function forceUpdate() {
    prev = false
    update()
  }
}
