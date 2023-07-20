import { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap"
import * as pdfjs from 'pdfjs-dist';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
type propsType = {
  id: number;
  path_file: string;
  title: string;
  description: string;
  type: "TUGAS" | "UTS" | "UAS";
  role?: "student" | "teacher";
  is_answered?: boolean;
}

export default function QuizCard({ id, path_file, title, description, type, role, is_answered }: propsType)  {
  const [imageSrc, setImageSrc] = useState("");
  const pdfUrl = `${path_file}`
  useEffect(() => {
    if(!role ) role = 'teacher'
  }, [])
  // useEffect(() => {
  //   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  //   const getPdfFirstPage = async () => {
  //     try {
  //       const pdf = await pdfjs.getDocument(pdfUrl).promise;
  //       const firstPage = await pdf.getPage(1);
  //       const viewport = firstPage.getViewport({ scale: 1 });
  //       const canvas = document.createElement('canvas');
  //       const context = canvas.getContext('2d');
  //       canvas.height = 200;
  //       canvas.width = viewport.width;
  //       await firstPage.render({ canvasContext: context, viewport }).promise;
  //       setImageSrc(canvas.toDataURL().toString());
  //     } catch (error) {
  //       console.error('Error loading PDF:', error);
  //     }
  //   };

  //   getPdfFirstPage();
  // }, [pdfUrl]);
  return (
    <>
      <Card className="">
        <Card.Header className="d-flex align-items-center justify-content-between">
          <div>

          <small className="rounded-pill bg-primary  py-1 px-3 text-white  "><b>{type}</b></small>
          <div className="d-flex justify-content-between mt-2">

            <h3>{title} </h3>
            {role == 'teacher' && (
              
          <DropdownButton title="Aksi">
            <Dropdown.Item href={`/quiz/${id}/edit`}>Edit</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Hapus</Dropdown.Item>
          </DropdownButton>
            )}
            </div>
          </div>

            {(role == 'student' && is_answered )&& (
            <FontAwesomeIcon icon={faCheckCircle} className="text-success display-6"  />
            )}
        </Card.Header>
        {/* {imageSrc && <Card.Img variant="top" src={imageSrc} className="shadow-sm" />} */}
        <Card.Body>
          <p>{description}</p>
          <Row>
            <Col>
              <Link className="w-100 btn btn-outline-primary" href={`${pdfUrl}`}>Liat Soal</Link>
            </Col>
            {(role == 'teacher'  || !role) && (
              <Col>
              <Link className="w-100 btn btn-outline-primary" href={`/quiz/${id}`}>Lihat Jawaban</Link>
            </Col>
            )}
            {(role === 'student' && !is_answered) ? (
              <Col>
              <Link className="w-100 btn btn-outline-primary" href={`/test/answer/${id}`}>Kumpulkan</Link>
            </Col>
                ):''}
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}