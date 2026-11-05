const D=window.DATA,$=i=>document.getElementById(i),f=n=>String(n).replace('.',','),norm=s=>s.trim().replace(/\s+/g,' ').toLowerCase();
let cur=null;
function show(v){document.querySelectorAll('[data-view]').forEach(e=>e.hidden=e.dataset.view!==v);scrollTo(0,0);const h=document.querySelector(`[data-view=${v}] h1,[data-view=${v}] h2`);if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}
$('kriteria').innerHTML=D.kriteria.map(k=>`<li>${k}</li>`).join('');
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>show(b.dataset.go));
$('form').onsubmit=e=>{e.preventDefault();const q=norm($('nama').value);show('loading');
 const msg=['Mencari data tim…','Memeriksa proposal…','Menyiapkan hasil…'];let i=0;$('lmsg').textContent=msg[0];$('lbar').style.width='0';
 setTimeout(()=>$('lbar').style.width='100%',30);const iv=setInterval(()=>$('lmsg').textContent=msg[++i%3],830);
 setTimeout(()=>{clearInterval(iv);cur=q&&D.tim.find(t=>norm(t.nama)===q)||null;cur?hasil():show('nf')},2500)};
function hasil(){const t=cur,ok=t.status==='lolos';
 $('hasil').innerHTML=`<span class="badge ${ok?'ok':'no'}">${ok?'Lolos ke Tahap Selanjutnya':'Belum Lolos'}</span><h2>${t.nama}</h2>${t.judul?`<p class="judul">${t.judul}</p>`:''}
 <p>${ok?'Selamat! Proposal tim kamu lolos. Panitia akan menghubungi ketua tim untuk informasi berikutnya.':'Proposal tim kamu belum lolos pada seleksi ini. Lihat rincian penilaian untuk evaluasi dari juri.'}</p>
 <p class="acts"><button class="btn" id="rin">Cek Rincian Penilaian</button><button class="btn alt" data-go="home" id="lain">Cek tim lain</button></p>`;
 $('rin').onclick=rincian;$('lain').onclick=()=>{$('nama').value='';show('home');$('nama').focus()};show('hasil')}
function rincian(){const t=cur;if(!t.skor)return show('nd');
 const rows=D.kriteria.map((k,i)=>{const s=t.skor[i];return `<div class="kri"><div><b>${k}</b><span>${f(s[2])}</span></div><div class="meter"><i style="width:${s[2]}%"></i></div><small>Juri 1: ${f(s[0])} · Juri 2: ${f(s[1])}</small>${t.evaluasi&&t.evaluasi[i]?`<p>${t.evaluasi[i]}</p>`:''}</div>`}).join('');
 $('rincian').innerHTML=`<h2>Rincian Penilaian</h2><p class="lead">${t.nama}</p><div class="px box">${rows}
 <div class="sum"><span>Rata-rata nilai</span><b>${f(t.rata)}</b></div>
 <div class="sum"><span>Pengurangan nilai${t.catatan&&t.catatan!=='-'?' ('+t.catatan+')':''}</span><b>-${f(t.pengurangan)}</b></div>
 <div class="sum end"><span>Nilai akhir</span><b>${f(t.total)}</b></div></div>
 <p><button class="btn" id="bk">Kembali ke hasil</button></p>`;$('bk').onclick=()=>show('hasil');show('rincian')}
