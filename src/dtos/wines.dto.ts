import { IsString } from 'class-validator';

export class GetWinesDto {
  @IsString()
  public name: string;

  @IsString()
  public minRating: string;

  @IsString()
  public maxRating: string;

  @IsString()
  public minPrice: string;

  @IsString()
  public maxPrice: string;
}
