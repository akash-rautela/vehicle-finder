import os
import sys
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

from report_builder_helpers import set_cell_margins, set_cell_shading, set_table_borders

def create_project_report():
    doc = docx.Document()
    
    # Configure Normal Style
    style_normal = doc.styles['Normal']
    style_normal.font.name = 'Times New Roman'
    style_normal.font.size = Pt(12)
    style_normal.font.color.rgb = RGBColor(0, 0, 0)
    
    # Helper to add standard body paragraph
    def add_p(text, bold_prefix="", indent=0):
        p = doc.add_paragraph()
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.space_before = Pt(0)
        if indent:
            p.paragraph_format.left_indent = Inches(indent)
        if bold_prefix:
            r_bold = p.add_run(bold_prefix)
            r_bold.font.name = 'Times New Roman'
            r_bold.font.size = Pt(12)
            r_bold.font.bold = True
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(12)
        return p

    # Helper for Chapter Title
    def add_chapter_header(ch_no_str, title_str):
        # Image guideline: Chapter No. - 14 Bold, Chapter Title - 16 Bold Uppercase
        # Uniformity, avoid underlines and colons!
        p_no = doc.add_paragraph()
        p_no.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_no.paragraph_format.space_before = Pt(18)
        p_no.paragraph_format.space_after = Pt(4)
        p_no.paragraph_format.line_spacing = 1.5
        r_no = p_no.add_run(ch_no_str.upper())
        r_no.font.name = 'Times New Roman'
        r_no.font.size = Pt(14)
        r_no.font.bold = True

        p_ti = doc.add_paragraph()
        p_ti.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_ti.paragraph_format.space_before = Pt(0)
        p_ti.paragraph_format.space_after = Pt(18)
        p_ti.paragraph_format.line_spacing = 1.5
        r_ti = p_ti.add_run(title_str.upper())
        r_ti.font.name = 'Times New Roman'
        r_ti.font.size = Pt(16)
        r_ti.font.bold = True

    # Helper for Heading (1.1, 1.2) - 14 Bold
    def add_heading_1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(14)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(14)
        r.font.bold = True
        return p

    # Helper for Subheading (1.1.1, 1.1.2) - 12 Bold
    def add_heading_2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(10)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
        r = p.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(12)
        r.font.bold = True
        return p

    # Helper for Figure insertion
    def add_figure(image_path, fig_num_caption, width=Inches(5.5)):
        p_img = doc.add_paragraph()
        p_img.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(10)
        p_img.paragraph_format.space_after = Pt(4)
        if os.path.exists(image_path):
            p_img.add_run().add_picture(image_path, width=width)
        else:
            p_img.add_run(f"[{image_path} Not Found]")
            
        # Caption below figure, format: Fig.1.5, 12 size, bold, title case
        p_cap = doc.add_paragraph()
        p_cap.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(2)
        p_cap.paragraph_format.space_after = Pt(12)
        p_cap.paragraph_format.line_spacing = 1.5
        r_cap = p_cap.add_run(fig_num_caption)
        r_cap.font.name = 'Times New Roman'
        r_cap.font.size = Pt(12)
        r_cap.font.bold = True

    # Helper for Table insertion
    def add_table_custom(table_num_caption, headers, rows_data, col_widths=None):
        # Caption above table, format: Table 1.5, 12 size, bold, title case
        p_cap = doc.add_paragraph()
        p_cap.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p_cap.paragraph_format.space_before = Pt(12)
        p_cap.paragraph_format.space_after = Pt(4)
        p_cap.paragraph_format.line_spacing = 1.5
        r_cap = p_cap.add_run(table_num_caption)
        r_cap.font.name = 'Times New Roman'
        r_cap.font.size = Pt(12)
        r_cap.font.bold = True

        tbl = doc.add_table(rows=len(rows_data) + 1, cols=len(headers))
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders(tbl)

        # Header row
        hdr_row = tbl.rows[0]
        tblPr = tbl._tbl.tblPr
        tblHeader = parse_xml(f'<w:tblHeader {nsdecls("w")}/>')
        hdr_row._tr.get_or_add_trPr().append(tblHeader)
        
        for c_idx, title in enumerate(headers):
            cell = hdr_row.cells[c_idx]
            set_cell_margins(cell, top=120, bottom=120, left=150, right=150)
            set_cell_shading(cell, "E2E8F0")
            cp = cell.paragraphs[0]
            cp.alignment = WD_ALIGN_PARAGRAPH.LEFT
            cp.paragraph_format.space_after = Pt(0)
            cp.paragraph_format.space_before = Pt(0)
            cr = cp.add_run(title)
            cr.font.name = 'Times New Roman'
            cr.font.size = Pt(10.5)
            cr.font.bold = True

        # Data rows
        for r_idx, row_values in enumerate(rows_data):
            data_row = tbl.rows[r_idx + 1]
            shading_color = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
            for c_idx, val in enumerate(row_values):
                cell = data_row.cells[c_idx]
                set_cell_margins(cell, top=100, bottom=100, left=150, right=150)
                set_cell_shading(cell, shading_color)
                cp = cell.paragraphs[0]
                cp.alignment = WD_ALIGN_PARAGRAPH.LEFT
                cp.paragraph_format.space_after = Pt(0)
                cp.paragraph_format.space_before = Pt(0)
                cr = cp.add_run(str(val))
                cr.font.name = 'Times New Roman'
                cr.font.size = Pt(10)

        if col_widths:
            for row in tbl.rows:
                for c_idx, w in enumerate(col_widths):
                    row.cells[c_idx].width = Inches(w)

        # Spacing after table
        p_sp = doc.add_paragraph()
        p_sp.paragraph_format.space_before = Pt(0)
        p_sp.paragraph_format.space_after = Pt(8)
        p_sp.paragraph_format.line_spacing = 1.0

    print("Core builders ready")
    return doc, add_p, add_chapter_header, add_heading_1, add_heading_2, add_figure, add_table_custom

print("Report generator setup imported successfully")
