setTinggi = () => {
			$('.tinggi').css('height', $(window).height() - 168)
		}
		setTinggi()
		$(window).resize(() => setTinggi())
		var app = new Vue({
			el: '#app',
			data: {
				kunci: '',
				jawaban: '',
				hasil: '',
				hasil_asli: '',
				top: 'x',
				nama: [],
				report: []
			},
			methods: {
				olah() {
					kunci = this.kunci.replace(/\t/g,'').replace(/ /g,'').split('')
					length_kunci = this.kunci.length
					this.top = length_kunci
					jawaban = this.jawaban.replace(/\t/g,'').split('\n')
					for(n in jawaban){
						jawaban[n] = jawaban[n].split(',')
						jawaban[n][1] = jawaban[n][1].replace(/ /g,'').split('')
					}
					hasil = []
					nama = []
					laporan = []
					for(n in jawaban){
						hasil.push(jawaban[n][0].toUpperCase())
						nama.push(jawaban[n][0].toUpperCase())
						benar = 0
						report_jawaban = ''
						for(y in jawaban[n][1]){
							if(jawaban[n][1][y].toLowerCase() == kunci[y].toLowerCase()){
								benar++
								report_jawaban += jawaban[n][1][y].toUpperCase()
							}else{
								report_jawaban += `<span class='bg-danger text-light'>${jawaban[n][1][y].toUpperCase()}</span>`
							}
						}
						hasil.push(benar)
						laporan.push(report_jawaban)
					}
					this.nama = nama
					this.laporan = laporan
					txt = ''
					txt_asli = ''
					for(n in hasil){
						if(n % 2 == 0){
							if(hasil[n] != ''){
								txt+= `${hasil[n]}: `
								txt_asli+= `${hasil[n]}: `
							}
						}else{
							function isInt(n){
							    return Number(n) === n && n % 1 === 0;
							}										
							count = hasil[n] / length_kunci * 100

							if(isInt(count)){
								txt+= `${count}\n`
							}else{
								txt+= `${count.toFixed(2)}\n`
							}
							txt_asli+= `${hasil[n]}\n`
						}
					}
					this.hasil = txt
					this.hasil_asli = txt_asli
				}
			},
			watch: {
				kunci() {
					this.olah()
				},
				jawaban() {
					this.olah()
				}
			}
		})