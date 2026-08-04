import { Logger } from 'jsr:@deno-library/logger';
import { COLORS } from "../../helpers/colors.ts";

// TODO: Implementar el LoggerAdapter

interface ILoggerAdapter {
    //props
    file: string;

    //Methods
    writeLog: (msg: string) => void;    
    writeWarningLog: (msg: string) => void;
    writeErrorLog: (msg: string) => void;

}

export class DenoLoggerAdapter implements ILoggerAdapter{
  
    public file: string;
    private logger = new Logger();

    constructor(file: string){
        this.file = file;
    }

    writeLog (msg: string): void{
        this.logger.info(`[${this.file} LOG] ${msg}`);
    };
    
    writeWarningLog (msg: string): void{
        this.logger.warn(`[${this.file} WARNING] ${msg}`);
    };
    
    writeErrorLog (msg: string): void{
        this.logger.error(`[${this.file} ERROR] ${msg}`);
    };
}
