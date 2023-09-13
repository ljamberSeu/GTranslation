import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TermSelect from "./components/term-select";
import Paper from "@mui/material/Paper";

// Generate Order Data
function createData (key, zhans, pt) {
  return { key, zhans, pt, id: "" };
}

const rows = [
  createData(
    "Private key",
    "私钥",
    "Chave privada"
  ),
  createData(
    "token approvals",
    "代币授权",
    "Aprovações de Token"
  ),
  createData(
    "Recovery phrase",
    "助记词 ",
    "Frase de recuperação "
  ),
  createData(
    "Swap",
    "兑换 ",
    "Trocar"
  ),
  createData(
    "Smart contract  ",
    "智能合约 ",
    "Contrato inteligente "
  ),
  createData(
    "Contract",
    "合约 ",
    "Contrato"
  ),
  createData(
    "Transaction hash (Tx hash)  ",
    "交易哈希 ",
    "Hash da transação (Tx hash) "
  ),
  createData(
    "Allowance",
    "授权额度 ",
    "Permissão"
  ),
  createData(
    "Approve ",
    "授权 ",
    "Aprovar"
  ),
  createData(
    "Approved spender ",
    "被授权方 ",
    "Gastador aprovado "
  ),
  createData(
    "Sign a message ",
    "签署消息 ",
    "Assinar uma mensagem "
  ),
  createData(
    "Spend your token ",
    "消费 ",
    "Gastar os seus tokens "
  ),
  createData(
    "Encryption",
    "加密 ",
    "Criptografia"
  ),
  createData(
    "key",
    "密钥 ",
    "chave"
  ),
  createData(
    "computer",
    "电脑 ",
    "computador"
  ),
  createData(
    "Public address ",
    "公用地址 ",
    "Endereço público "
  ),
  createData(
    "Web3",
    "Web3",
    "Web3"
  ),
  createData(
    "Amount",
    "数额 ",
    "Quantidade"
  )
];

function preventDefault (event) {
  event.preventDefault();
}

export default function TermsLib () {
  return (
    <div style={ { width: "100%", margin: "80px" }}>
      <div style={{ display: "flex", gap: "50px", float: "left" }}>
        <Button color="primary" >
          <AddIcon color='primary' />
          Add more library
        </Button>
        <TermSelect />
      </div>
      <Paper>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Key</TableCell>
              <TableCell>Zhans</TableCell>
              <TableCell>Pt-BR</TableCell>
              <TableCell>Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.key}</TableCell>
                <TableCell>{row.zhans}</TableCell>
                <TableCell>{row.pt}</TableCell>
                <TableCell>{row.id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
