export function getDateWithFormat(format: string, date = new Date()) {
  const pad = function (num: number) {
    const norm = Math.floor(Math.abs(num));
    return (norm < 10 ? '0' : '') + norm.toString();
  };
  const padms = function (num: number) {
    const norm = Math.floor(Math.abs(num));
    return (norm < 100 ? '00' : '') + norm.toString();
  };

  const Y = date.getFullYear();
  const strY = Y.toString();

  const m = date.getMonth() + 1;
  const strm = pad(m);

  const d = date.getDate();
  const strd = pad(d);

  const H = date.getHours();
  const strH = pad(H);

  const I = date.getMinutes();
  const strI = pad(I);

  const S = date.getSeconds();
  const strS = pad(S);

  const Z = date.getMilliseconds();
  const strZ = padms(Z);

  if (format === 'Y-m-d') {
    return date.toISOString().slice(0, 10);
  } else if (format === 'YmdHIS') {
    return strY + strm + strd + strH + strI + strS;
  } else if (format === 'Ymd HI') {
    return strY + strm + strd + ' ' + strH + strI;
  } else if (format === 'Ymd') {
    return strY + strm + strd;
  } else if (format === 'YmdHISZ') {
    return strY + strm + strd + strH + strI + strS + strZ;
  } else if (format === 'd/m/Y H:I:S') {
    return (
      strd + '/' + strm + '/' + strY + ' ' + strH + ':' + strI + ':' + strS
    );
  } else {
    return strY + strm + strd + strH + strI + strS;
  }
}

export function toIsoString(date: Date){
  const tzo = -date.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    const pad = (num: number) => (num < 10 ? '0' : '') + num;

    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      dif +
      pad(Math.floor(Math.abs(tzo) / 60)) +
      ':' +
      pad(Math.abs(tzo) % 60)
    );
}
