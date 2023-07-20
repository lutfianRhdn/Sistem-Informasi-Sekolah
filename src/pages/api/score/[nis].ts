import prisma from "@lib/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { nis } = req.query
    const student = await prisma.murid.findUnique({
      where: { nis: nis as string  },
      include: {
        jawaban: {
          include: {
            soal: {
              include: {
                guru: true
              }
            }
          }
        }
      }
    })
    const teachers = await prisma.guru.findMany()
    if(!student) return res.status(404).json({error:"Murid tidak ditemukan"})
    let result :any= []
    teachers.forEach(teacher => {
      const tugas = student.jawaban.filter(soalJawaban => soalJawaban.soal.type === 'TUGAS' && soalJawaban.soal.guru.id === teacher.id) || {}
      const uts = student.jawaban.filter(soalJawaban => soalJawaban.soal.type === 'UTS' && soalJawaban.soal.guru.id === teacher.id) || {}
      const uas = student.jawaban.filter(soalJawaban => soalJawaban.soal.type === 'UAS' && soalJawaban.soal.guru.id === teacher.id) || {}

      // sum all nilai 
      const nilaiTugas = tugas.reduce((acc, soalJawaban) => {
        return acc + soalJawaban.nilai
      }, 0) /tugas.length ||0

      const nilaiUTS = uts.reduce((acc, soalJawaban) => {
        return acc + soalJawaban.nilai
      }, 0)

      const nilaiUAS = uas.reduce((acc, soalJawaban) => {
        return acc + soalJawaban.nilai
      }, 0)

      // calculate 25% tugaas 40% uts 45% uas 
      const nilaiAkhir = (nilaiTugas * 0.25) + (nilaiUTS * 0.4) + (nilaiUAS * 0.45)
      result.push({
        teacher,
        mata_pelajaran:teacher.mata_pelajaran,
        tugas:nilaiTugas,
        uts:nilaiUTS,
        uas:nilaiUAS,
        nilai_akhir:nilaiAkhir
      })
    })
    return res.status(200).json(result )
   
    return res.status(200).json({})
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}
