import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Boneco from "../../public/boneco.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Map, TicketCheck } from "lucide-react";
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";

export default function Home() {
  return (
    <section className="p-5 md:p-20">
      <div className="flex flex-col md:flex-row items-center gap-3">
        <Image src={Boneco} alt="" className="w-16 h-16 md:w-auto md:h-auto" />
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl">Olá, Mariana</h1>
          <p className="text-sm md:text-base">
            Confira todos os seus eventos e locais em um só lugar!
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-5 my-5">
        <Card className="w-full md:w-1/2 bg-feedback-sucess_support 
        flex items-center h-fit justify-between px-5 border-none">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              <Map className="w-[20px] md:w-[24px]" /> Locais
            </CardTitle>
            <CardDescription className="text-sm md:text-md">
              Confira todos os locais cadastrados!
            </CardDescription>
          </CardHeader>
          <Button className="bg-white text-black rounded-[8px] 
          hover:bg-slate-300 hover:underline 
          transition-all ease-in ">Conferir Locais</Button>
        </Card>
        <Card className="w-full md:w-1/2 bg-feedback-error_support 
        flex items-center h-fit justify-between px-5 border-none" >
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              <TicketCheck className="w-[20px] md:w-[24px]" /> Eventos
            </CardTitle>
            <CardDescription className="text-sm md:text-md">
              Confira os eventos cadastrados!
            </CardDescription>
          </CardHeader>
          <Button className="bg-white text-black rounded-[8px] 
          hover:bg-slate-300 hover:underline 
          transition-all ease-in ">Conferir Eventos</Button>
        </Card>
      </div>
      <div className="flex gap-5">
        <Table className="bg-surfaces-surface rounded-xl p-5">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Estádio</TableHead>
              <TableHead>Logradouro</TableHead>
              <TableHead>Entradas</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">Morumbis</TableCell>
              <TableCell>Av Giovanni Gronchi</TableCell>
              <TableCell>C, D, E</TableCell>
              <TableCell className="text-right">
                <Button>
                  <EllipsisVertical />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Morumbis</TableCell>
              <TableCell>Av Giovanni Gronchi</TableCell>
              <TableCell>C, D, E</TableCell>
              <TableCell className="text-right">
                <Button>
                  <EllipsisVertical />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table className="bg-surfaces-surface rounded-xl p-5">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </div>
    </section>
  );
}
