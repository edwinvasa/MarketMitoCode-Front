import { DetalleVenta } from "./DetalleVenta";
import { PersonaVenta } from "./PersonaVenta";
import { Venta } from "./Venta";

export class VentaListDetalle {
    persona:      PersonaVenta;
    venta:        Venta;
    detalleVenta: DetalleVenta[];
}