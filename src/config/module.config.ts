import { DynamicModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { join } from "path";

export function configModule(): DynamicModule {
    return ConfigModule.forRoot({
      envFilePath: join(process.cwd(), '.env'),
      isGlobal: true,
    });
  }