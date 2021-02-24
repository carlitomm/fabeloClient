import { Ivideo } from './videos.interface';
import { Iimage } from './images.interface';

export interface Iproject{
    id: number;
    titulo: string;
    fecha: Date;
    descripcion: string;
    dimensiones: string;
    material: string;
    images:Iimage[];
    videos:Ivideo[];
    order: number;
    videoDimensions: string;
}