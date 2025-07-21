import {
    FORM_REPORT,
    GET_REPORT,
    GET_REPORTS,
    CREATE_REPORT,
    SHOW_ERROR_REPORT,
    SELECT_REPORT,
    DESELECT_REPORT,
    DELETE_REPORT,
    UPDATE_REPORT,
    SEARCH_REPORTS,
    RESET_REPORT_MESSAGE,
    VALIDATE_REPORT,
    INVALIDATE_REPORT,
    GET_REPORTS_RELATED,
    CREATE_REPORT_DOCUMENT,
    SELECT_ONLY_REPORT,
    GET_REPORT_INTERLOCKS,
    GET_REPORT_AYE,
    GET_REPORT_PHOTOS
} from '../../types/index'

export default (state, action) => {
    switch (action.type) {
        case FORM_REPORT:
            return {
                ...state,
                form: !state.form,
                error: false
            }
        case GET_REPORT:
            return {
                ...state,
                report: action.payload,
                error: false
            }
        case GET_REPORTS:
            return {
                ...state,
                searchreports: action.payload,
                reports: action.payload,
                interlocks: [],
                related: null,
                error: false
            }
        case GET_REPORTS_RELATED:
            return {
                ...state,
                related: action.payload.filter(r => r.name !== state.report[0].name),
                error: false
            }
        case CREATE_REPORT:
            return {
                ...state,
                reports: [...state.reports, action.payload],
                interlocks: [],
                related: null,
                form: false,
                error: false
            }
        case RESET_REPORT_MESSAGE:
            return {
                ...state,
                message: null
            }
        case SELECT_REPORT:
            return {
                ...state,
                report: state.reports.filter(report => report._id === action.payload),
                related: null,
                interlocks: [],
                error: false
            }
        case VALIDATE_REPORT:
            return {
                ...state,
                reportname_ok: true
            }
        case INVALIDATE_REPORT:
            return {
                ...state,
                message: action.payload,
                reportname_ok: false
            }
        case DELETE_REPORT:
            return {
                ...state,
                reports: state.reports.filter(report => report._id !== action.payload),
                searchreports: state.searchreports.filter(report => report._id !== action.payload),
                report: null,
                error: false
            }
        case SHOW_ERROR_REPORT:
            return {
                ...state,
                message: action.payload,
                error: true
            }
        case DESELECT_REPORT:
            return {
                ...state,
                form: false,
                report: null,
                related: null,
                interlocks: [],
                error: false
            }
        case UPDATE_REPORT:
            return {
                ...state,
                form: false,
                report: null,
                error: false
            }
        case SEARCH_REPORTS:
            return {
                ...state,
                searchreports: state.reports.filter(report =>
                    report.name.indexOf(action.payload) > -1
                ),
                report: null,
                interlocks: [],
                form: false,
                error: false
            }
        case CREATE_REPORT_DOCUMENT:
            return {
                ...state,
                error: false,
                urlDoc: action.payload
            }
        case SELECT_ONLY_REPORT:
            return {
                ...state,
                form: true,
                report: [action.payload],
                interlocks: [],
                error: false
            }
        case GET_REPORT_INTERLOCKS:
            return {
                ...state,
                form: true,
                interlocks: [action.payload],
                error: false
            }
        case GET_REPORT_AYE:
            return {
                ...state,
                form: true,
                alarmasyeventos: [action.payload],
                error: false
            }
        case GET_REPORT_PHOTOS:
            return {
                ...state,
                form: true,
                fotos: action.payload,
                error: false
            }
        default:
            return state;
    }
}
