"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
     Pagination, PaginationContent, PaginationEllipsis,
     PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import {
     Table, TableBody,
     TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { EllipsisVertical, Search } from "lucide-react";


export default function Locais() {
     return (
          <section className="p-5 md:p-20">
               <div>
                    <h1 className="text-2xl">Locais (0)</h1>
                    <p>
                         Confira a lista de todos os locais cadastrados.
                    </p>
               </div>
               <div className="bg-surfaces-surface p-5 rounded-lg mt-5">
                    <div className="flex justify-between">
                         <div className="flex items-center gap-4 bg-[#333B49]  
                          relative w-1/4">
                              <Search className="absolute left-2
                               w-5 h-5 text-[#6D99FB]" />
                              <Input
                                   className="w-full border-none pl-10"
                                   placeholder="Pesquise por nome do local" />
                         </div>

                         <Button onClick={() => {

                              window.location.href = "/locais/register";
                         }} className="bg-white text-black rounded-[8px] 
                              hover:bg-slate-300 hover:underline 
                              transition-all ease-in ">
                              Adicionar local
                         </Button>
                    </div>
                    <div className="p-5">
                         <Table className="my-5">
                              <TableHeader >
                                   <TableRow className="border-none">
                                        <TableHead className="font-bold">
                                             Nome do Local
                                        </TableHead>
                                        <TableHead className="font-bold">
                                             Endereço
                                        </TableHead>
                                        <TableHead className="font-bold">
                                             Cidade e Estado
                                        </TableHead>
                                        <TableHead className="font-bold">
                                             Portões Cadastrados
                                        </TableHead>
                                        <TableHead className="font-bold">
                                             Atualizações
                                        </TableHead>
                                        <TableHead className="text-right"></TableHead>
                                   </TableRow>
                              </TableHeader>
                              <TableBody>
                                   <TableRow>
                                        <TableCell>Morumbis</TableCell>
                                        <TableCell>Av Giovanni Gronchi</TableCell>
                                        <TableCell>São Paulo</TableCell>
                                        <TableCell>A, B, C, D, E</TableCell>
                                        <TableCell>10/03/2025</TableCell>
                                        <TableCell className="text-right">
                                             <Button>
                                                  <EllipsisVertical />
                                             </Button>
                                        </TableCell>
                                   </TableRow>
                              </TableBody>
                         </Table>

                         <Pagination className="">
                              <PaginationContent>
                                   <PaginationItem>
                                        <PaginationPrevious href="#" />
                                   </PaginationItem>
                                   <PaginationItem>
                                        <PaginationLink>
                                             1
                                        </PaginationLink>
                                   </PaginationItem>
                                   <PaginationItem>
                                        <PaginationEllipsis />
                                   </PaginationItem>
                                   <PaginationItem>
                                        <PaginationNext href="#" />
                                   </PaginationItem>
                              </PaginationContent>
                         </Pagination>
                    </div>
               </div>
          </section>
     );
}
