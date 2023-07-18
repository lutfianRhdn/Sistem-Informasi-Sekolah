import { Dropdown, Table as ReactTable } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { THSort } from '@components/TableSort'

type TypeLabelProps = {
  type: string;
}


type Props = {
  datas: object[];
  headers: string[];
} & Pick<Parameters<typeof THSort>[0], 'setSort' | 'setOrder'>

export default function Table(props: Props) {
  const { datas,headers, setSort, setOrder } = props

  return (
    <ReactTable  bordered hover >
      <thead className="bg-light">
        <tr>
          <th> <THSort name='index' setSort={setSort} setOrder={setOrder}>#</THSort></th>
          {headers.map(header => (
            <th className="text-end"><THSort name={header} setSort={setSort} setOrder={setOrder}>{header}</THSort></th>
          ))}
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {datas.map((data:any,index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            {headers.map(header => (
              <td>{data[header].split('_').join(' ')}</td>
            )
            )}
            <td>
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${data.id}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    className="text-danger"
                    href="#/action-3"
                  >
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </ReactTable>
  )
}
