<?php

namespace App\Http\Controllers\Utils;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class ExcellAuditPlanControll implements FromView, WithEvents
{
    private $data;
    private $layout;
    private $col;

    public function __construct($data, $layout='backend.layouts.export-excel')
    {
        $this->data = $data;
        $this->layout = $layout;
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $spreadsheet = new Spreadsheet();
                $Alph = [];
                foreach (range('A', 'Z') as $char) {
                    $Alph[] = $char;
                }
//                $countData = count($this->data);
//                $countData1 = count($this->data)+1;


                $styleArray = [
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                            'color' => ['argb' => '000000'],
                        ],
                    ],
                ];

                $styleArrayOutline = [
                    'borders' => [
                        'outline' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                            'color' => ['argb' => '000000'],
                        ],
                    ],
                ];

                $header = 4;
                $first = 5;
                foreach(json_decode($this->data) as $key=>$val){
                    $event->sheet->getDelegate()->getStyle('A'.$first.':N'.$first)->applyFromArray($styleArray);
                    $event->sheet->getDelegate()->getStyle('A'.$first)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

                    $first++;
                }

                $event->sheet->getDelegate()->getColumnDimension('B')->setWidth(16);
                $event->sheet->getDelegate()->getColumnDimension('C')->setWidth(30);
                $event->sheet->getDelegate()->getColumnDimension('D')->setWidth(23);
                $event->sheet->getDelegate()->getColumnDimension('F')->setWidth(23);
                $event->sheet->getDelegate()->getColumnDimension('E')->setWidth(18);
                $event->sheet->getDelegate()->getColumnDimension('G')->setWidth(18);
                $event->sheet->getDelegate()->getColumnDimension('H')->setWidth(23);
                $event->sheet->getDelegate()->getColumnDimension('I')->setWidth(23);
                $event->sheet->getDelegate()->getColumnDimension('J')->setWidth(18);
                $event->sheet->getDelegate()->getColumnDimension('K')->setWidth(30);
                $event->sheet->getDelegate()->getColumnDimension('L')->setWidth(23);
                $event->sheet->getDelegate()->getColumnDimension('M')->setWidth(18);
                $event->sheet->getDelegate()->getColumnDimension('N')->setWidth(18);
                $event->sheet->getDelegate()->getStyle('A'.$header.':N'.$header)->getFont()->setBold(true);
                $event->sheet->getDelegate()->getStyle('A'.$header.':N'.$header)->applyFromArray($styleArray);
                $event->sheet->getDelegate()->getStyle('A'.$header.':N'.$header)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
                $event->sheet->getDelegate()->getStyle('A1')->getFont()->setBold(true);
                $event->sheet->getDelegate()->getStyle('A1')->getFont()->setSize(14);
                $event->sheet->getDelegate()->getStyle('A1')->getFont()->setBold(true);
                $event->sheet->getDelegate()->getStyle('A1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
            }
        ];
    }


    public function view(): View
    {

        return view($this->layout, [
            'data' => json_decode($this->data)
        ]);
    }
}
