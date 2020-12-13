import {
  ERROR_DATA,
  REQUEST_DATA,
  SUCCESS_DATA,
  SORT_TABLE,
  SELECT_ROW,
  SUCCESS_NEW_USER_IN_TABLE,
  SEND_NEW_USER_IN_TABLE,
  SEARCH_ROW,
  tableSortingFields,
} from '../../const'

const initialState = {
  data: [],
  isFetchingSmallData: false,
  sortBy: '',
  selectedRow: 0,
  returnedError: false,
}

const regSearchRow = (enteredString, sdata) => {
  let arrSData = sdata
  let phoneString = ''
  enteredString = enteredString.split(' ')
  Object.entries(enteredString).map(([keyString, valueString]) => {
    Object.entries(tableSortingFields).map(([key, value]) => {
      arrSData.filter((valueFilter) => {
        if (key === 'phone') {
          phoneString = valueFilter.phone
            .replace(/\(/g, '')
            .replace(/\)/g, '')
            .replace(/-/g, '')
        }
        if (
          '' + valueFilter[key] === valueString ||
          phoneString === valueString ||
          phoneString.exec(/value/)
        ) {
          console.log(valueFilter[key], valueString)
        }
        return ''
      })
      return ''
    })
    return ''
  })
}

const dynamicSort = (field) => {
  let sortOrder = 1
  if (field[0] === '-') {
    // * Обратная сортировка
    sortOrder = -1
    field = field.substr(1)
  }
  return (a, b) => {
    // * Если a будет меньше, чем б, то result будет -1 и не поменяются местами
    // * Аналогично с а больше б, но поменяются местами
    const result = a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0
    return result * sortOrder
  }
}

export default function DataTableUsersReducer(
  state = initialState,
  { type, data },
) {
  switch (type) {
    case REQUEST_DATA:
      return {
        ...state,
        isFetchingSmallData: true,
      }
    case SUCCESS_DATA:
      return {
        ...state,
        data: data,
        isFetchingSmallData: false,
      }
    case ERROR_DATA:
      return {
        ...state,
        data: [
          {
            id: 'null',
            email: 'null',
            firstName: 'null',
            lastName: 'null',
            phone: 'null',
            address: 'null',
          },
        ],
        isFetchingSmallData: false,
        returnedError: true,
      }
    case SEARCH_ROW:
      regSearchRow(data, state.data)
      return {
        ...state,
        // data: data
      }
    case SORT_TABLE:
      return {
        ...state,
        sortBy: data,
        data: state.data.slice().sort(dynamicSort(data)),
      }
    case SELECT_ROW:
      return {
        ...state,
        selectedRow: state.data.find((row) => row.id === parseInt(data)),
      }
    case SEND_NEW_USER_IN_TABLE:
      return {
        ...state,
        isFetchingSmallData: true,
      }
    case SUCCESS_NEW_USER_IN_TABLE:
      console.log(state)
      state.data.unshift(data)
      return {
        ...state,
        data: state.data,
        isFetchingSmallData: false,
      }
    default:
      return {
        data: [
          {
            id: 'null',
            email: 'null',
            firstName: 'null',
            lastName: 'null',
            phone: 'null',
            address: 'null',
          },
        ],
      }
  }
}