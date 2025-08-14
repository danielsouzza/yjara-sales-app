function applyMask(value, mask) {
  let v = value.replace(/\D/g, '');
  let m = '';
  let vi = 0;
  for (let i = 0; i < mask.length && vi < v.length; i++) {
    if (mask[i] === '#') {
      m += v[vi++];
    } else {
      m += mask[i];
    }
  }
  return m;
}

export default {
  beforeMount(el, binding) {
    el.addEventListener('input', (e) => {
      const mask = binding.value;
      e.target.value = applyMask(e.target.value, mask);
      e.target.setSelectionRange(e.target.value.length, e.target.value.length);
      // e.target.dispatchEvent(new Event('input'));
    });
  },
  updated(el, binding) {
    const mask = binding.value;
    const masked = applyMask(el.value, mask);
    if (el.value !== masked) {
      el.value = masked;
      el.setSelectionRange(el.value.length, el.value.length);
      el.dispatchEvent(new Event('input'));
    }
  }
} 