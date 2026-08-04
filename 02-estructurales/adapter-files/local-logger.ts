import { COLORS } from '../../helpers/colors.ts';

// import { LocalLogger } from "../01-adapter.ts";
import { DenoLoggerAdapter } from "./logger-adapter.ts";

// TODO: Implementar el LocalLogger Class

const localLog = new DenoLoggerAdapter('local-logger.ts');

localLog.writeLog('un log normal en la app');
localLog.writeWarningLog('esapacio utilizado casi al 100%, borrar archivos');
localLog.writeErrorLog('valide la información y vuelva a intentar');

