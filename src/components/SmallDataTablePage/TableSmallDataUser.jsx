import React, { useState, useEffect } from 'react'

export const TableSmallDataUser = (props) => {
  const [charActiveFieldSmallTable, setCharActiveFieldSmallTable] = useState('')
  const [activeFieldSmallTable, setActiveFieldSmallTable] = useState('')

  useEffect(() => {}, [props.dataUserSmall])

  const choicePersonUserInSmallTable = (event) => {
    console.log(event.currentTarget.id)
  }
  const choiceSortFieldInSmallTable = (event) => {
    if (charActiveFieldSmallTable === '' && activeFieldSmallTable === '') {
      setCharActiveFieldSmallTable(String.fromCharCode(9660))
      setActiveFieldSmallTable(event.target.id)
      props.SortingSmallData(props.dataUserSmall, event.target.id + '_UP')
    } else if (
      charActiveFieldSmallTable === String.fromCharCode(9660) &&
      activeFieldSmallTable === event.target.id
    ) {
      setCharActiveFieldSmallTable(String.fromCharCode(9650))
      props.SortingSmallData(props.dataUserSmall, event.target.id + '_DOWN')
    } else if (
      charActiveFieldSmallTable === String.fromCharCode(9650) &&
      activeFieldSmallTable === event.target.id
    ) {
      setCharActiveFieldSmallTable(String.fromCharCode(9660))
      props.SortingSmallData(props.dataUserSmall, event.target.id + '_UP')
    } else if (activeFieldSmallTable !== event.target.id) {
      setCharActiveFieldSmallTable(String.fromCharCode(9660))
      setActiveFieldSmallTable(event.target.id)
    }
  }

  //BUG При переключении между окнами данных возвращает {data: [{}]} вместо [{}]
  console.log(props.dataUserSmall, 'data adas')
  let tableSmall32 = props.dataUserSmall.map((index, key) => {
    return (
      <tr onClick={choicePersonUserInSmallTable} id={index.id} key={key}>
        <td>{index.id}</td>
        <td>{index.firstName}</td>
        <td>{index.lastName}</td>
        <td>{index.email}</td>
        <td>{index.phone}</td>
      </tr>
    )
  })

  const upperMainTableSmall32 = Object.keys(props.dataUserSmall[0]).map(
    (index, key) => {
      if (index !== 'address' && index !== 'description') {
        return (
          <td
            id={'SORT_' + index.toUpperCase()}
            onClick={choiceSortFieldInSmallTable}
            key={key}
          >
            {index}{' '}
            {activeFieldSmallTable === 'SORT_' + index.toUpperCase()
              ? charActiveFieldSmallTable
              : ''}
          </td>
        )
      } else {
        return <td key={key}></td>
      }
    },
  )
  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>{upperMainTableSmall32}</tr>
        </thead>
        <tbody>{tableSmall32}</tbody>
      </table>
    </React.Fragment>
  )
}