import customParseFormatPlugin from 'dayjs/plugin/customParseFormat'
import localizedFormatPlugin from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import locale from 'dayjs/locale/en-gb'
import dayjs from 'dayjs'

dayjs.locale(locale) // force global locale
dayjs.extend(utc)
dayjs.extend(customParseFormatPlugin)
dayjs.extend(localizedFormatPlugin)

export default dayjs
