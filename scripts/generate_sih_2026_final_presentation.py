"""
POLAR-AI: Smart India Hackathon 2026 - Official 6-Slide Final Idea Presentation
Problem Statement: SIH26062 - Integrated Polar Expedition Logistics And Asset Management System
Team: CompileX
Outputs:
  - POLAR_AI_SIH_2026_IDEA_PRESENTATION_FINAL.pptx
  - POLAR_AI_SIH_2026_IDEA_PRESENTATION_FINAL.pdf
"""

import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# ==============================================================================
# DESIGN SYSTEM: POLAR ARCTIC ICE & AEROSPACE PALETTE (LIGHT THEME)
# ==============================================================================
BG_WHITE       = RGBColor(255, 255, 255)  # Pure White #FFFFFF
BG_ICE         = RGBColor(248, 251, 253)  # Ultra-light Ice #F8FBFD
BG_SURFACE     = RGBColor(241, 248, 251)  # Light Polar Tint #F1F8FB
BG_CARD        = RGBColor(255, 255, 255)  # Card Background #FFFFFF
BG_CARD_ALT    = RGBColor(245, 250, 253)  # Alternate Card #F5FAFD
BG_CARD_TINT   = RGBColor(235, 245, 251)  # Card Soft Ice #EBF5FB
BG_ACCENT_SOFT = RGBColor(224, 242, 254)  # Soft Sky Accent #E0F2FE

BORDER_SUBTLE  = RGBColor(226, 236, 242)  # Subtle Slate Border #E2ECF2
BORDER_CARD    = RGBColor(203, 222, 235)  # Card Border #CBDEEB
BORDER_ACCENT  = RGBColor(186, 230, 253)  # Sky Border #BAE6FD
BORDER_ACTIVE  = RGBColor(2, 132, 199)    # Primary Polar Border #0284C7

POLAR_BLUE     = RGBColor(2, 132, 199)    # Primary Polar Blue #0284C7
POLAR_SKY      = RGBColor(14, 165, 233)   # Sky Blue #0EA5E9
POLAR_DEEP     = RGBColor(3, 105, 161)    # Deep Navy Blue #0369A1

TEXT_NAVY      = RGBColor(16, 42, 67)     # Deep Navy Text #102A43
TEXT_HEADING   = RGBColor(12, 30, 48)     # Deepest Heading #0C1E30
TEXT_SECONDARY = RGBColor(71, 85, 105)    # Slate Secondary #475569
TEXT_MUTED     = RGBColor(100, 116, 139)  # Muted Slate #64748B
TEXT_WHITE     = RGBColor(255, 255, 255)  # Crisp White

ALERT_ROSE     = RGBColor(225, 29, 72)    # Risk Rose #E11D48
ALERT_ROSE_BG  = RGBColor(255, 241, 242) # Soft Rose Tint #FFF1F2
ALERT_AMBER    = RGBColor(217, 119, 6)    # Amber Warning #D97706
ALERT_AMBER_BG = RGBColor(254, 243, 199) # Soft Amber Tint #FEF3C7
SUCCESS_GREEN  = RGBColor(5, 150, 105)    # Emerald Success #059669
SUCCESS_BG     = RGBColor(236, 253, 245)  # Soft Green Tint #ECFDF5

FONT_FAMILY    = "Segoe UI"
TOTAL_SLIDES   = 6
SIH_LOGO_PATH  = os.path.abspath(r"assets/presentation/sih_logo.png")


# ==============================================================================
# HELPER FUNCTIONS: BASE LAYOUT, HEADERS, FOOTERS, AND CARDS
# ==============================================================================
def create_base_slide(prs):
    """Creates a 16:9 widescreen slide with subtle ice background."""
    blank_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(blank_layout)
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = BG_ICE
    bg.line.fill.background()
    return slide

def add_consistent_header(slide, badge_text, title_text, subtitle_text):
    """
    Renders standardized SIH presentation header with exact positioning:
    - Top Left: CompileX brand pill
    - Top Right: SMART INDIA HACKATHON logo
    - Category Badge, Main Title, Subtitle, and Divider Line
    """
    # 1. Top Left: CompileX Brand Pill
    cx_pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.30), Inches(1.5), Inches(0.38))
    cx_pill.fill.solid()
    cx_pill.fill.fore_color.rgb = BG_WHITE
    cx_pill.line.color.rgb = BORDER_CARD
    cx_pill.line.width = Pt(1.2)
    tf_cx = cx_pill.text_frame
    tf_cx.word_wrap = False
    tf_cx.vertical_anchor = MSO_ANCHOR.MIDDLE
    p_cx = tf_cx.paragraphs[0]
    p_cx.text = "CompileX"
    p_cx.alignment = PP_ALIGN.CENTER
    p_cx.font.size = Pt(12)
    p_cx.font.bold = True
    p_cx.font.name = FONT_FAMILY
    p_cx.font.color.rgb = TEXT_NAVY

    # 2. Top Right: SIH Official Logo (Transparent PNG)
    if os.path.exists(SIH_LOGO_PATH):
        slide.shapes.add_picture(SIH_LOGO_PATH, Inches(11.40), Inches(0.24), width=Inches(1.15), height=Inches(0.54))

    # 3. Dynamic Category Badge Pill
    badge_w = min(6.4, max(3.6, len(badge_text) * 0.088))
    badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.80), Inches(badge_w), Inches(0.26))
    badge.fill.solid()
    badge.fill.fore_color.rgb = BG_ACCENT_SOFT
    badge.line.color.rgb = BORDER_ACCENT
    badge.line.width = Pt(0.75)
    tf_b = badge.text_frame
    tf_b.word_wrap = False
    tf_b.vertical_anchor = MSO_ANCHOR.MIDDLE
    p_b = tf_b.paragraphs[0]
    p_b.text = badge_text.upper()
    p_b.alignment = PP_ALIGN.CENTER
    p_b.font.size = Pt(8.5)
    p_b.font.bold = True
    p_b.font.name = FONT_FAMILY
    p_b.font.color.rgb = POLAR_BLUE

    # 4. Slide Title
    title_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.12), Inches(11.733), Inches(0.46))
    tf_t = title_box.text_frame
    tf_t.word_wrap = True
    tf_t.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf_t.margin_top = tf_t.margin_bottom = tf_t.margin_left = tf_t.margin_right = 0
    p_t = tf_t.paragraphs[0]
    p_t.text = title_text
    p_t.font.size = Pt(20)
    p_t.font.bold = True
    p_t.font.name = FONT_FAMILY
    p_t.font.color.rgb = TEXT_HEADING
    p_t.alignment = PP_ALIGN.LEFT

    # 5. Slide Subtitle
    sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.58), Inches(11.733), Inches(0.28))
    tf_s = sub_box.text_frame
    tf_s.word_wrap = True
    tf_s.vertical_anchor = MSO_ANCHOR.TOP
    tf_s.margin_top = tf_s.margin_bottom = tf_s.margin_left = tf_s.margin_right = 0
    p_s = tf_s.paragraphs[0]
    p_s.text = subtitle_text
    p_s.font.size = Pt(10.5)
    p_s.font.name = FONT_FAMILY
    p_s.font.color.rgb = TEXT_SECONDARY
    p_s.alignment = PP_ALIGN.LEFT

    # 6. Subtle Divider Line
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.90), Inches(11.733), Pt(1))
    line.fill.solid()
    line.fill.fore_color.rgb = BORDER_SUBTLE
    line.line.fill.background()

def add_consistent_footer(slide, slide_num):
    """Adds standardized SIH footer with identical placement across all slides."""
    foot_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(7.02), Inches(11.733), Pt(1))
    foot_line.fill.solid()
    foot_line.fill.fore_color.rgb = BORDER_SUBTLE
    foot_line.line.fill.background()

    left_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.08), Inches(8.5), Inches(0.3))
    tf_l = left_box.text_frame
    tf_l.margin_top = tf_l.margin_bottom = tf_l.margin_left = tf_l.margin_right = 0
    p_l = tf_l.paragraphs[0]
    p_l.text = "SMART INDIA HACKATHON 2026 | PS ID: SIH26062 | POLAR-AI: MISSION CONTINUITY INTELLIGENCE"
    p_l.font.size = Pt(8.5)
    p_l.font.name = FONT_FAMILY
    p_l.font.color.rgb = TEXT_MUTED

    right_box = slide.shapes.add_textbox(Inches(9.5), Inches(7.08), Inches(3.033), Inches(0.3))
    tf_r = right_box.text_frame
    tf_r.margin_top = tf_r.margin_bottom = tf_r.margin_left = tf_r.margin_right = 0
    p_r = tf_r.paragraphs[0]
    p_r.text = f"TEAM COMPILEX | SLIDE {slide_num} OF {TOTAL_SLIDES}"
    p_r.alignment = PP_ALIGN.RIGHT
    p_r.font.size = Pt(8.5)
    p_r.font.bold = True
    p_r.font.name = FONT_FAMILY
    p_r.font.color.rgb = POLAR_BLUE

def add_card(slide, left, top, width, height, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1, shape_type=MSO_SHAPE.ROUNDED_RECTANGLE):
    """Creates a crisp card container with standardized margins."""
    card = slide.shapes.add_shape(shape_type, Inches(left), Inches(top), Inches(width), Inches(height))
    card.fill.solid()
    card.fill.fore_color.rgb = bg_color
    if border_color:
        card.line.color.rgb = border_color
        card.line.width = Pt(border_width)
    else:
        card.line.fill.background()
    tf = card.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = MSO_ANCHOR.TOP
    tf.margin_top = Inches(0.12)
    tf.margin_bottom = Inches(0.12)
    tf.margin_left = Inches(0.16)
    tf.margin_right = Inches(0.16)
    return card


# ==============================================================================
# SLIDE 1: TEAM DETAILS & PROJECT TITLE
# ==============================================================================
def build_slide_1(prs):
    slide = create_base_slide(prs)

    # Top Left Brand Pill: CompileX
    cx_pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.35), Inches(1.6), Inches(0.42))
    cx_pill.fill.solid()
    cx_pill.fill.fore_color.rgb = BG_WHITE
    cx_pill.line.color.rgb = BORDER_CARD
    cx_pill.line.width = Pt(1.5)
    tf_cx = cx_pill.text_frame
    tf_cx.vertical_anchor = MSO_ANCHOR.MIDDLE
    p_cx = tf_cx.paragraphs[0]
    p_cx.text = "CompileX"
    p_cx.alignment = PP_ALIGN.CENTER
    p_cx.font.size = Pt(13)
    p_cx.font.bold = True
    p_cx.font.name = FONT_FAMILY
    p_cx.font.color.rgb = TEXT_NAVY

    # Top Right SIH Logo
    if os.path.exists(SIH_LOGO_PATH):
        slide.shapes.add_picture(SIH_LOGO_PATH, Inches(11.40), Inches(0.30), width=Inches(1.15), height=Inches(0.54))

    # Center Hero Banner: SMART INDIA HACKATHON 2026
    hero_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.10), Inches(11.733), Inches(0.65))
    tf_h = hero_box.text_frame
    tf_h.vertical_anchor = MSO_ANCHOR.MIDDLE
    p_h = tf_h.paragraphs[0]
    p_h.text = "SMART INDIA HACKATHON 2026"
    p_h.font.size = Pt(26)
    p_h.font.bold = True
    p_h.font.name = FONT_FAMILY
    p_h.font.color.rgb = TEXT_HEADING

    p_h_sub = tf_h.add_paragraph()
    p_h_sub.text = "National Idea Presentation · Problem Statement ID: SIH26062"
    p_h_sub.font.size = Pt(12)
    p_h_sub.font.bold = True
    p_h_sub.font.name = FONT_FAMILY
    p_h_sub.font.color.rgb = POLAR_BLUE

    # Left Container: Problem & Official Registration Metadata
    left_card = add_card(slide, 0.8, 1.95, 5.75, 4.0, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1.2)
    tf_lc = left_card.text_frame
    tf_lc.margin_left = Inches(0.25)
    tf_lc.margin_right = Inches(0.25)
    tf_lc.margin_top = Inches(0.25)

    p_lt = tf_lc.paragraphs[0]
    p_lt.text = "OFFICIAL REGISTRATION DETAILS"
    p_lt.font.size = Pt(10)
    p_lt.font.bold = True
    p_lt.font.name = FONT_FAMILY
    p_lt.font.color.rgb = POLAR_BLUE
    p_lt.space_after = Pt(14)
    p_lt.alignment = PP_ALIGN.LEFT

    fields = [
        ("Problem Statement ID:", "SIH26062"),
        ("Problem Statement Title:", "Integrated Polar Expedition Logistics And Asset Management System"),
        ("Theme:", "Smart Automation"),
        ("PS Category:", "Software"),
        ("Team Name:", "CompileX (Registered on Portal)"),
        ("Team ID:", "- (As recorded on portal)"),
    ]

    for label, val in fields:
        p = tf_lc.add_paragraph()
        p.space_after = Pt(8)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = label + " "
        r1.font.bold = True
        r1.font.size = Pt(10.5)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = TEXT_NAVY

        r2 = p.add_run()
        r2.text = val
        r2.font.bold = False
        r2.font.size = Pt(10.5)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_SECONDARY

    # Right Container: Project Identity & Core Positioning
    right_card = add_card(slide, 6.78, 1.95, 5.75, 4.0, bg_color=BG_CARD_TINT, border_color=BORDER_ACTIVE, border_width=1.5)
    tf_rc = right_card.text_frame
    tf_rc.margin_left = Inches(0.25)
    tf_rc.margin_right = Inches(0.25)
    tf_rc.margin_top = Inches(0.25)

    p_rt = tf_rc.paragraphs[0]
    p_rt.text = "PROJECT IDENTITY & POSITIONING"
    p_rt.font.size = Pt(10)
    p_rt.font.bold = True
    p_rt.font.name = FONT_FAMILY
    p_rt.font.color.rgb = POLAR_DEEP
    p_rt.space_after = Pt(8)
    p_rt.alignment = PP_ALIGN.LEFT

    p_pname = tf_rc.add_paragraph()
    p_pname.text = "POLAR-AI"
    p_pname.font.size = Pt(28)
    p_pname.font.bold = True
    p_pname.font.name = FONT_FAMILY
    p_pname.font.color.rgb = POLAR_BLUE
    p_pname.alignment = PP_ALIGN.LEFT

    p_pexp = tf_rc.add_paragraph()
    p_pexp.text = "Polar Operations, Logistics & Autonomous Resilience Intelligence"
    p_pexp.font.size = Pt(11.5)
    p_pexp.font.bold = True
    p_pexp.font.name = FONT_FAMILY
    p_pexp.font.color.rgb = TEXT_HEADING
    p_pexp.space_after = Pt(12)
    p_pexp.alignment = PP_ALIGN.LEFT

    p_usp_badge = tf_rc.add_paragraph()
    p_usp_badge.alignment = PP_ALIGN.LEFT
    r_ub = p_usp_badge.add_run()
    r_ub.text = "CORE MISSION STATEMENT:\n"
    r_ub.font.size = Pt(9.5)
    r_ub.font.bold = True
    r_ub.font.color.rgb = POLAR_BLUE

    r_ud = p_usp_badge.add_run()
    r_ud.text = "Mission Continuity Intelligence for Extreme Environments"
    r_ud.font.size = Pt(13)
    r_ud.font.bold = True
    r_ud.font.color.rgb = TEXT_NAVY
    p_usp_badge.space_after = Pt(10)

    p_desc = tf_rc.add_paragraph()
    p_desc.alignment = PP_ALIGN.LEFT
    p_desc.text = (
        "POLAR-AI transforms fragmented manifests, sensor logs, and operational records into "
        "proactive intelligence — monitoring resource runways, predicting cascading multi-tier outages, "
        "and enabling safe human decisions under extreme isolation."
    )
    p_desc.font.size = Pt(10)
    p_desc.font.name = FONT_FAMILY
    p_desc.font.color.rgb = TEXT_SECONDARY
    p_desc.space_after = Pt(14)

    p_geo = tf_rc.add_paragraph()
    p_geo.alignment = PP_ALIGN.LEFT
    r_g1 = p_geo.add_run()
    r_g1.text = "Dual-Theatre Architecture: "
    r_g1.font.bold = True
    r_g1.font.size = Pt(9.5)
    r_g1.font.color.rgb = TEXT_NAVY
    r_g2 = p_geo.add_run()
    r_g2.text = "Antarctica (Maitri & Bharati) · Arctic (Himadri, Svalbard) · Logistics (NCPOR Goa)"
    r_g2.font.bold = False
    r_g2.font.size = Pt(9.5)
    r_g2.font.color.rgb = POLAR_DEEP

    # Bottom 3 Quick Pillar Cards
    pillars = [
        ("Predictive Continuity", "Dynamic 0–100% telemetry scoring & shortage horizon alerts"),
        ("What-If Simulation", "Models supply delays, consumption surges, & ration trade-offs"),
        ("100% Offline Autonomy", "Local PWA storage & deterministic conflict-free sync on reconnect"),
    ]
    for idx, (p_title, p_desc_text) in enumerate(pillars):
        px = 0.8 + idx * 3.98
        p_card = add_card(slide, px, 6.10, 3.77, 0.78, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1)
        tf_pc = p_card.text_frame
        tf_pc.margin_top = Inches(0.08)
        p1 = tf_pc.paragraphs[0]
        p1.text = p_title
        p1.font.size = Pt(10)
        p1.font.bold = True
        p1.font.name = FONT_FAMILY
        p1.font.color.rgb = POLAR_BLUE
        p1.alignment = PP_ALIGN.LEFT
        
        p2 = tf_pc.add_paragraph()
        p2.text = p_desc_text
        p2.font.size = Pt(8.5)
        p2.font.name = FONT_FAMILY
        p2.font.color.rgb = TEXT_SECONDARY
        p2.alignment = PP_ALIGN.LEFT

    add_consistent_footer(slide, 1)


# ==============================================================================
# SLIDE 2: PROBLEM STATEMENT + SOLUTION + USP
# ==============================================================================
def build_slide_2(prs):
    slide = create_base_slide(prs)
    add_consistent_header(
        slide,
        "PROBLEM CONTEXT · ARCHITECTURAL INNOVATION · CORE USP",
        "FROM FRAGMENTED MISSION DATA TO MISSION CONTINUITY INTELLIGENCE",
        "Bridging the critical operational gap between passive logistics tracking and proactive mission survival."
    )

    # Left Column: THE POLAR CHALLENGE (Width = 5.75", Left = 0.8")
    lbl_left = slide.shapes.add_textbox(Inches(0.8), Inches(2.02), Inches(5.75), Inches(0.3))
    tf_ll = lbl_left.text_frame
    tf_ll.margin_top = tf_ll.margin_bottom = tf_ll.margin_left = tf_ll.margin_right = 0
    p_ll = tf_ll.paragraphs[0]
    p_ll.text = "THE POLAR CHALLENGE: WHY PASSIVE TRACKING FAILS"
    p_ll.font.size = Pt(10.5)
    p_ll.font.bold = True
    p_ll.font.name = FONT_FAMILY
    p_ll.font.color.rgb = ALERT_ROSE
    p_ll.alignment = PP_ALIGN.LEFT

    challenges = [
        ("1. Fragmented Data Silos", "Cargo manifests, stock levels, equipment health, and rosters remain isolated across manual spreadsheets.", ALERT_ROSE),
        ("2. Resupply Uncertainty", "8-month winter freeze-out; blizzards and pack ice cause shipping delays where consumption surges create fatal deficits.", ALERT_ROSE),
        ("3. Limited Operational Visibility", "Station commanders lack a unified cockpit to correlate incoming cargo ETA against critical station burn rates.", ALERT_AMBER),
        ("4. Cascading Dependencies", "Failure of one resource cascades: Fuel Deficit → Generator G-01 Trip → Station Power Loss → Heating Failure → Lab Halted.", ALERT_ROSE),
        ("5. Connectivity Constraints", "Severe polar blizzards & geomagnetic interference break satellite links; field sorties operate in complete communication silence.", ALERT_AMBER),
    ]

    for idx, (title, desc, accent) in enumerate(challenges):
        cy = 2.35 + idx * 0.72
        card = add_card(slide, 0.8, cy, 5.75, 0.66, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1)
        tf_c = card.text_frame
        tf_c.margin_top = Inches(0.06)
        tf_c.margin_bottom = Inches(0.06)
        tf_c.margin_left = Inches(0.14)
        tf_c.margin_right = Inches(0.14)

        p1 = tf_c.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(9.5)
        p1.font.bold = True
        p1.font.name = FONT_FAMILY
        p1.font.color.rgb = accent
        p1.alignment = PP_ALIGN.LEFT

        p2 = tf_c.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(8.3)
        p2.font.name = FONT_FAMILY
        p2.font.color.rgb = TEXT_SECONDARY
        p2.alignment = PP_ALIGN.LEFT

    # Strong Callout Sentence beneath Challenge Column
    callout_box = add_card(slide, 0.8, 6.00, 5.75, 0.88, bg_color=ALERT_AMBER_BG, border_color=ALERT_AMBER, border_width=1)
    tf_co = callout_box.text_frame
    tf_co.margin_top = Inches(0.08)
    tf_co.margin_left = Inches(0.14)
    p_co = tf_co.paragraphs[0]
    p_co.text = "\"Knowing what changed is not enough.\nOperators need to understand what that change means for mission continuity.\""
    p_co.font.size = Pt(9.5)
    p_co.font.bold = True
    p_co.font.name = FONT_FAMILY
    p_co.font.color.rgb = ALERT_AMBER
    p_co.alignment = PP_ALIGN.LEFT

    # Right Column: POLAR-AI MISSION CONTINUITY SOLUTION (Width = 5.75", Left = 6.78")
    lbl_right = slide.shapes.add_textbox(Inches(6.78), Inches(2.02), Inches(5.75), Inches(0.3))
    tf_lr = lbl_right.text_frame
    tf_lr.margin_top = tf_lr.margin_bottom = tf_lr.margin_left = tf_lr.margin_right = 0
    p_lr = tf_lr.paragraphs[0]
    p_lr.text = "POLAR-AI SOLUTION: END-TO-END RESILIENCE PIPELINE"
    p_lr.font.size = Pt(10.5)
    p_lr.font.bold = True
    p_lr.font.name = FONT_FAMILY
    p_lr.font.color.rgb = POLAR_BLUE
    p_lr.alignment = PP_ALIGN.LEFT

    pipeline_steps = [
        ("STAGE 1: UNIFIED MISSION DATA INGESTION", "Integrates Cargo manifests, Inventory burn-rates, Machinery wear, Personnel, & Weather into a single relational state model.", POLAR_BLUE, BG_CARD_TINT),
        ("STAGE 2: MISSION CONTINUITY ENGINE", "Computes composite 0–100% continuity score, calculates days-to-stockout runway, & evaluates directed dependency graph linkages.", POLAR_DEEP, BG_WHITE),
        ("STAGE 3: PREDICTIVE & CASCADING IMPACT ANALYSIS", "Detects emerging risks 7–14 days ahead; explains root causes and traces multi-tier asset cascade risks automatically.", POLAR_BLUE, BG_CARD_TINT),
        ("STAGE 4: WHAT-IF SIMULATION & MITIGATION OPTIONS", "Allows operators to test resupply delays, fuel rationing, or generator load-shedding before real-world operational execution.", POLAR_DEEP, BG_WHITE),
        ("STAGE 5: SOVEREIGN HUMAN DECISION SUPPORT", "Synthesizes ranked operational mitigations; keeps sovereign human commander in absolute control (Review → Approve/Modify → Audit).", SUCCESS_GREEN, SUCCESS_BG),
    ]

    for idx, (title, desc, accent, bg_col) in enumerate(pipeline_steps):
        cy = 2.35 + idx * 0.72
        card = add_card(slide, 6.78, cy, 5.75, 0.66, bg_color=bg_col, border_color=BORDER_ACTIVE if accent == POLAR_BLUE else BORDER_CARD, border_width=1)
        tf_c = card.text_frame
        tf_c.margin_top = Inches(0.06)
        tf_c.margin_bottom = Inches(0.06)
        tf_c.margin_left = Inches(0.14)
        tf_c.margin_right = Inches(0.14)

        p1 = tf_c.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(9.3)
        p1.font.bold = True
        p1.font.name = FONT_FAMILY
        p1.font.color.rgb = accent
        p1.alignment = PP_ALIGN.LEFT

        p2 = tf_c.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(8.2)
        p2.font.name = FONT_FAMILY
        p2.font.color.rgb = TEXT_SECONDARY
        p2.alignment = PP_ALIGN.LEFT

    # Right Bottom: Prominent USP Card
    usp_card = add_card(slide, 6.78, 6.00, 5.75, 0.88, bg_color=BG_ACCENT_SOFT, border_color=BORDER_ACTIVE, border_width=1.5)
    tf_usp = usp_card.text_frame
    tf_usp.margin_top = Inches(0.08)
    tf_usp.margin_left = Inches(0.14)
    tf_usp.margin_right = Inches(0.14)

    p_usp_t = tf_usp.paragraphs[0]
    p_usp_t.text = "CORE USP — MISSION CONTINUITY INTELLIGENCE"
    p_usp_t.font.size = Pt(9)
    p_usp_t.font.bold = True
    p_usp_t.font.name = FONT_FAMILY
    p_usp_t.font.color.rgb = POLAR_DEEP
    p_usp_t.alignment = PP_ALIGN.LEFT

    p_usp_b = tf_usp.add_paragraph()
    p_usp_b.text = "“POLAR-AI connects mission resources, dependencies and operational risks to predict cascading impacts and test mitigation options before they become mission-critical.”"
    p_usp_b.font.size = Pt(9.5)
    p_usp_b.font.bold = True
    p_usp_b.font.name = FONT_FAMILY
    p_usp_b.font.color.rgb = TEXT_NAVY
    p_usp_b.alignment = PP_ALIGN.LEFT

    add_consistent_footer(slide, 2)


# ==============================================================================
# SLIDE 3: TECHNICAL APPROACH (DIAGRAM-FIRST & CODEBASE HONEST)
# ==============================================================================
def build_slide_3(prs):
    slide = create_base_slide(prs)
    add_consistent_header(
        slide,
        "SYSTEM ARCHITECTURE · DATA PIPELINE · FIELD-VERIFIED TECH STACK",
        "TECHNICAL APPROACH: ZERO-BANDWIDTH RESILIENT ARCHITECTURE",
        "Diagram-first end-to-end mission intelligence flow with local-first persistence and zero cloud dependency."
    )

    # Top Flow: 5 Architecture Layers (Horizontal diagram flow across 11.733")
    flow_layers = [
        ("1. MISSION DATA LAYER", "Multi-Source Ingestion", [
            "• Cargo Manifests (Transit/Hold)",
            "• Station Stock (Runway Burn)",
            "• Asset Wear & Generator Logs",
            "• Personnel & Sortie Rosters",
            "• Polar Meteorology (Wind/Blizzard)"
        ], BG_WHITE, BORDER_CARD),
        ("2. STATE & DATA LAYER", "Unified Relational State", [
            "• Reactive DataContext Store",
            "• IndexedDB Local Persistence",
            "• Immutable Audit Ledger",
            "• Multi-Station Isolation",
            "• Client Cache Storage Engine"
        ], BG_CARD_TINT, BORDER_ACCENT),
        ("3. CONTINUITY ENGINE", "Deterministic Intelligence", [
            "• Continuity Score (0–100%)",
            "• Dynamic Stock Runway Engine",
            "• Directed Dependency Graph",
            "• Cascade Impact Analyzer",
            "• Mission Memory Pattern Recall"
        ], BG_ACCENT_SOFT, BORDER_ACTIVE),
        ("4. DECISION SUPPORT", "Simulation & Guidance", [
            "• Interactive What-If Simulator",
            "• Causal Root-Cause Explainer",
            "• Ranked Mitigation Options",
            "• Emergency Triage & SOS",
            "• Tactical Command Search (⌘K)"
        ], BG_WHITE, BORDER_ACTIVE),
        ("5. COMMAND & AUDIT", "Human-in-the-Loop", [
            "• Sovereign Commander Gate",
            "• Role-Based Access (RBAC)",
            "• Action Approvals & Overrides",
            "• Cryptographic Timestamp Log",
            "• Mission Readiness Ensured"
        ], SUCCESS_BG, SUCCESS_GREEN),
    ]

    card_w = 2.22
    gap = 0.16
    for idx, (title, subtitle, items, bg_col, b_col) in enumerate(flow_layers):
        cx = 0.8 + idx * (card_w + gap)
        card = add_card(slide, cx, 2.05, card_w, 2.70, bg_color=bg_col, border_color=b_col, border_width=1.2)
        tf = card.text_frame
        tf.margin_top = Inches(0.10)
        tf.margin_left = Inches(0.12)
        tf.margin_right = Inches(0.12)

        p1 = tf.paragraphs[0]
        p1.text = title
        p1.font.size = Pt(8.5)
        p1.font.bold = True
        p1.font.name = FONT_FAMILY
        p1.font.color.rgb = POLAR_BLUE if b_col != SUCCESS_GREEN else SUCCESS_GREEN
        p1.alignment = PP_ALIGN.LEFT

        p2 = tf.add_paragraph()
        p2.text = subtitle
        p2.font.size = Pt(8)
        p2.font.bold = True
        p2.font.name = FONT_FAMILY
        p2.font.color.rgb = TEXT_NAVY
        p2.space_after = Pt(6)
        p2.alignment = PP_ALIGN.LEFT

        for item in items:
            pi = tf.add_paragraph()
            pi.text = item
            pi.font.size = Pt(7.3)
            pi.font.name = FONT_FAMILY
            pi.font.color.rgb = TEXT_SECONDARY
            pi.space_after = Pt(2.5)
            pi.alignment = PP_ALIGN.LEFT

        # Add connector arrow between cards (except after last card)
        if idx < len(flow_layers) - 1:
            arrow_x = cx + card_w + 0.02
            arrow_box = slide.shapes.add_textbox(Inches(arrow_x), Inches(3.20), Inches(0.14), Inches(0.3))
            tf_a = arrow_box.text_frame
            tf_a.margin_top = tf_a.margin_bottom = tf_a.margin_left = tf_a.margin_right = 0
            pa = tf_a.paragraphs[0]
            pa.text = "→"
            pa.font.size = Pt(14)
            pa.font.bold = True
            pa.font.name = FONT_FAMILY
            pa.font.color.rgb = POLAR_BLUE
            pa.alignment = PP_ALIGN.CENTER

    # Bottom Left: OFFLINE & FIELD SYNCHRONIZATION FLOW (Width = 5.75", Left = 0.8")
    off_card = add_card(slide, 0.8, 4.88, 5.75, 2.02, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1.2)
    tf_oc = off_card.text_frame
    tf_oc.margin_top = Inches(0.12)
    tf_oc.margin_left = Inches(0.16)
    tf_oc.margin_right = Inches(0.16)

    p_ot = tf_oc.paragraphs[0]
    p_ot.text = "OFFLINE-FIRST FIELD SYNCHRONIZATION ARCHITECTURE"
    p_ot.font.size = Pt(9.5)
    p_ot.font.bold = True
    p_ot.font.name = FONT_FAMILY
    p_ot.font.color.rgb = POLAR_BLUE
    p_ot.space_after = Pt(6)
    p_ot.alignment = PP_ALIGN.LEFT

    p_od = tf_oc.add_paragraph()
    p_od.text = "Polar sorties & station winterings operate under complete communication silence. Zero cloud dependency:"
    p_od.font.size = Pt(8.5)
    p_od.font.name = FONT_FAMILY
    p_od.font.color.rgb = TEXT_SECONDARY
    p_od.space_after = Pt(8)
    p_od.alignment = PP_ALIGN.LEFT

    # 4 Horizontal flow steps for offline
    off_steps = [
        ("Online Master", "Pre-departure sync of all manifests & models"),
        ("Local PWA Cache", "Service worker precaches app, data & maps"),
        ("Offline Operation", "Sorties log inventory, sorties, & incidents"),
        ("Auto Re-Sync", "Deterministic conflict-free push on link recovery"),
    ]
    for idx, (st, sd) in enumerate(off_steps):
        sx = 0.95 + idx * 1.34
        scard = add_card(slide, sx, 5.65, 1.26, 1.12, bg_color=BG_CARD_TINT, border_color=BORDER_ACCENT, border_width=1)
        tf_sc = scard.text_frame
        tf_sc.margin_top = Inches(0.06)
        tf_sc.margin_left = Inches(0.08)
        tf_sc.margin_right = Inches(0.08)
        p1 = tf_sc.paragraphs[0]
        p1.text = f"Step {idx+1}: {st}"
        p1.font.size = Pt(7.8)
        p1.font.bold = True
        p1.font.name = FONT_FAMILY
        p1.font.color.rgb = POLAR_DEEP
        p1.alignment = PP_ALIGN.LEFT
        p2 = tf_sc.add_paragraph()
        p2.text = sd
        p2.font.size = Pt(7)
        p2.font.name = FONT_FAMILY
        p2.font.color.rgb = TEXT_SECONDARY
        p2.alignment = PP_ALIGN.LEFT

    # Bottom Right: CODEBASE-VERIFIED IMPLEMENTATION STACK (Width = 5.75", Left = 6.78")
    tech_card = add_card(slide, 6.78, 4.88, 5.75, 2.02, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1.2)
    tf_tc = tech_card.text_frame
    tf_tc.margin_top = Inches(0.12)
    tf_tc.margin_left = Inches(0.16)
    tf_tc.margin_right = Inches(0.16)

    p_tt = tf_tc.paragraphs[0]
    p_tt.text = "CODEBASE-VERIFIED IMPLEMENTATION STACK (100% AUDITED)"
    p_tt.font.size = Pt(9.5)
    p_tt.font.bold = True
    p_tt.font.name = FONT_FAMILY
    p_tt.font.color.rgb = SUCCESS_GREEN
    p_tt.space_after = Pt(6)
    p_tt.alignment = PP_ALIGN.LEFT

    stack_rows = [
        ("Frontend & Architecture:", "React 18 · Vite 8 · Modern Single-Page Application with responsive grid"),
        ("Styling & Design System:", "Tailwind CSS v4 · Lucide React Icons · Light Polar Aerospace design"),
        ("Geospatial Visualization:", "Leaflet · React-Leaflet · Polar Projection Coordinates (Maitri/Bharati/Himadri)"),
        ("Data Visualization:", "Recharts Engine (Stock runways, degradation curves, multi-station comparisons)"),
        ("Offline & Local Storage:", "Vite PWA Plugin · Service Worker (Workbox) · IndexedDB & LocalStorage Cache"),
        ("Cloud Ready & Auth:", "Supabase Client SDK · Deterministic Role-Based Access Control (RBAC)"),
    ]

    for label, val in stack_rows:
        p = tf_tc.add_paragraph()
        p.space_after = Pt(2.5)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = label + " "
        r1.font.bold = True
        r1.font.size = Pt(8.2)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = TEXT_NAVY

        r2 = p.add_run()
        r2.text = val
        r2.font.bold = False
        r2.font.size = Pt(8.2)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_SECONDARY

    add_consistent_footer(slide, 3)


# ==============================================================================
# SLIDE 4: FEASIBILITY & VIABILITY
# ==============================================================================
def build_slide_4(prs):
    slide = create_base_slide(prs)
    add_consistent_header(
        slide,
        "FIELD FEASIBILITY · OPERATIONAL VIABILITY · RISK MITIGATION MATRIX",
        "FEASIBILITY & VIABILITY: RIGOROUS EXTREME-ENVIRONMENT FIT",
        "Demonstrating working software capabilities, operational constraints handling, and scalable deployment."
    )

    # 4 Quadrants (2x2 layout, each width = 5.75", height = 2.36")
    # Q1: TECHNICAL FEASIBILITY (Working & Demonstrable in Codebase)
    q1 = add_card(slide, 0.8, 2.05, 5.75, 2.36, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1.2)
    tf_1 = q1.text_frame
    tf_1.margin_top = Inches(0.12)
    tf_1.margin_left = Inches(0.16)
    p_1t = tf_1.paragraphs[0]
    p_1t.text = "1. TECHNICAL FEASIBILITY (DEMONSTRATED IN CODEBASE)"
    p_1t.font.size = Pt(9.5)
    p_1t.font.bold = True
    p_1t.font.name = FONT_FAMILY
    p_1t.font.color.rgb = POLAR_BLUE
    p_1t.space_after = Pt(6)
    p_1t.alignment = PP_ALIGN.LEFT

    q1_features = [
        ("• Mission Continuity Engine:", "Live 0–100% composite health index recalculating across real operational data."),
        ("• What-If Simulator:", "Interactive perturbation of resupply delays, consumption surges, & generator shutdowns."),
        ("• Cascading Dependency Graph:", "Visual linkage of assets (Fuel → Generators → Power → Heating → Science)."),
        ("• Offline-First PWA:", "Service worker precaching assets; full navigation & logging without active internet."),
        ("• Mission Memory Intelligence:", "Synthesizes lessons from historical polar logs to advise active sorties."),
    ]
    for feat, desc in q1_features:
        p = tf_1.add_paragraph()
        p.space_after = Pt(2.5)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = feat + " "
        r1.font.bold = True
        r1.font.size = Pt(8.2)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = TEXT_NAVY
        r2 = p.add_run()
        r2.text = desc
        r2.font.bold = False
        r2.font.size = Pt(8.2)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_SECONDARY

    # Q2: OPERATIONAL FEASIBILITY (Extreme Environment Reality)
    q2 = add_card(slide, 6.78, 2.05, 5.75, 2.36, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1.2)
    tf_2 = q2.text_frame
    tf_2.margin_top = Inches(0.12)
    tf_2.margin_left = Inches(0.16)
    p_2t = tf_2.paragraphs[0]
    p_2t.text = "2. OPERATIONAL FEASIBILITY (POLAR ENVIRONMENT FIT)"
    p_2t.font.size = Pt(9.5)
    p_2t.font.bold = True
    p_2t.font.name = FONT_FAMILY
    p_2t.font.color.rgb = POLAR_DEEP
    p_2t.space_after = Pt(6)
    p_2t.alignment = PP_ALIGN.LEFT

    q2_points = [
        ("• Remote Polar Deployment:", "Built for Antarctic stations (Maitri, Bharati) & Arctic research (Himadri)."),
        ("• Low-Bandwidth Hardware Tolerance:", "Ultra-compact web bundle (<1.2MB gzip) runs on low-power field rugged laptops."),
        ("• Strict Resource Constraints:", "Models non-negotiable fuel, water, ration, & medical buffer reserve limits."),
        ("• Centralized Mission Command:", "Unifies logistics, science, and medical officers under synchronized theatre state."),
        ("• Human-in-the-Loop Governance:", "Zero autonomous overrides of life-support; decisions require commander signature."),
    ]
    for pt, desc in q2_points:
        p = tf_2.add_paragraph()
        p.space_after = Pt(2.5)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = pt + " "
        r1.font.bold = True
        r1.font.size = Pt(8.2)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = TEXT_NAVY
        r2 = p.add_run()
        r2.text = desc
        r2.font.bold = False
        r2.font.size = Pt(8.2)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_SECONDARY

    # Q3: CHALLENGE -> MITIGATION MATRIX
    q3 = add_card(slide, 0.8, 4.52, 5.75, 2.38, bg_color=BG_CARD_TINT, border_color=BORDER_ACCENT, border_width=1.2)
    tf_3 = q3.text_frame
    tf_3.margin_top = Inches(0.12)
    tf_3.margin_left = Inches(0.16)
    p_3t = tf_3.paragraphs[0]
    p_3t.text = "3. OPERATIONAL CHALLENGES & VERIFIED MITIGATIONS"
    p_3t.font.size = Pt(9.5)
    p_3t.font.bold = True
    p_3t.font.name = FONT_FAMILY
    p_3t.font.color.rgb = ALERT_ROSE
    p_3t.space_after = Pt(6)
    p_3t.alignment = PP_ALIGN.LEFT

    mitigations = [
        ("Limited / Zero Connectivity", "Offline-first PWA caching with persistent IndexedDB & local queue."),
        ("Concurrent Offline Data Edits", "Deterministic timestamped state reconciliation upon link restoration."),
        ("Complex Multi-System Dependencies", "Directed dependency graphs tracing ripple effects before decisions."),
        ("Untrusted AI Recommendations", "Strict Human-in-the-Loop gate; explainable rule heuristics & audit logs."),
        ("Dynamic Extreme Weather", "What-If simulation recalculates burn & runway prior to sortie dispatch."),
    ]
    for ch, mit in mitigations:
        p = tf_3.add_paragraph()
        p.space_after = Pt(2.5)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = "• " + ch + " → "
        r1.font.bold = True
        r1.font.size = Pt(8.2)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = ALERT_ROSE
        r2 = p.add_run()
        r2.text = mit
        r2.font.bold = False
        r2.font.size = Pt(8.2)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_NAVY

    # Q4: SCALABILITY BEYOND POLAR OPERATIONS
    q4 = add_card(slide, 6.78, 4.52, 5.75, 2.38, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1.2)
    tf_4 = q4.text_frame
    tf_4.margin_top = Inches(0.12)
    tf_4.margin_left = Inches(0.16)
    p_4t = tf_4.paragraphs[0]
    p_4t.text = "4. STRATEGIC SCALABILITY ROADMAP"
    p_4t.font.size = Pt(9.5)
    p_4t.font.bold = True
    p_4t.font.name = FONT_FAMILY
    p_4t.font.color.rgb = SUCCESS_GREEN
    p_4t.space_after = Pt(6)
    p_4t.alignment = PP_ALIGN.LEFT

    scale_tiers = [
        ("Phase 1: Indian Polar Expeditions", "Deployment across Antarctic stations (Maitri, Bharati) & Arctic base (Himadri)."),
        ("Phase 2: Multi-Station Network", "Synchronization across supply vessels (MV Vasily Golovnin), aircraft, & field camps."),
        ("Phase 3: High-Altitude Defense & Science", "Extensible to Siachen, Ladakh, and Himalayan glaciological outposts."),
        ("Phase 4: Disaster Relief Operations", "Blackout logistics coordination for island emergencies (Andaman) & flood relief."),
        ("Phase 5: Extreme Industrial Sectors", "Offshore oil platforms, deep-sea exploration, and remote mining sites."),
    ]
    for st, sd in scale_tiers:
        p = tf_4.add_paragraph()
        p.space_after = Pt(2.5)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = "• " + st + ": "
        r1.font.bold = True
        r1.font.size = Pt(8.2)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = POLAR_DEEP
        r2 = p.add_run()
        r2.text = sd
        r2.font.bold = False
        r2.font.size = Pt(8.2)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_SECONDARY

    add_consistent_footer(slide, 4)


# ==============================================================================
# SLIDE 5: IMPACT & BENEFITS
# ==============================================================================
def build_slide_5(prs):
    slide = create_base_slide(prs)
    add_consistent_header(
        slide,
        "OPERATIONAL VALUE · QUANTIFIABLE RESILIENCE GAINS",
        "IMPACT & BENEFITS: PROTECTING POLAR SCIENCE & EXPEDITION LIVES",
        "Delivering operational clarity, early hazard awareness, and defensible decision support for national polar programs."
    )

    # 4 Main Impact Pillars (Width = 5.75", Height = 2.05")
    # Pillar 1: Unified Operational Visibility
    p1 = add_card(slide, 0.8, 2.05, 5.75, 2.05, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1.2)
    tf_1 = p1.text_frame
    tf_1.margin_top = Inches(0.12)
    tf_1.margin_left = Inches(0.16)
    p_1t = tf_1.paragraphs[0]
    p_1t.text = "1. UNIFIED OPERATIONAL VISIBILITY"
    p_1t.font.size = Pt(9.5)
    p_1t.font.bold = True
    p_1t.font.name = FONT_FAMILY
    p_1t.font.color.rgb = POLAR_BLUE
    p_1t.space_after = Pt(6)
    p_1t.alignment = PP_ALIGN.LEFT

    p1_items = [
        ("• Single Glass Cockpit:", "Consolidates distributed manifests, stock ledgers, and machinery telemetry into one real-time operational picture."),
        ("• Complete Cargo Pipeline:", "Tracks multi-stage freight movement from NCPOR Goa through Cape Town to Antarctic ice shelf offloading."),
        ("• Real-Time Runway Calculations:", "Replaces guesswork with dynamic burn-rate projections for fuel, water, medical supplies, and food."),
        ("• Multi-Station Oversight:", "Allows expedition commanders to monitor Maitri, Bharati, and Himadri stations simultaneously."),
    ]
    for it, desc in p1_items:
        p = tf_1.add_paragraph()
        p.space_after = Pt(2.5)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = it + " "
        r1.font.bold = True
        r1.font.size = Pt(8.2)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = TEXT_NAVY
        r2 = p.add_run()
        r2.text = desc
        r2.font.bold = False
        r2.font.size = Pt(8.2)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_SECONDARY

    # Pillar 2: Early Risk Awareness & Cascade Detection
    p2 = add_card(slide, 6.78, 2.05, 5.75, 2.05, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1.2)
    tf_2 = p2.text_frame
    tf_2.margin_top = Inches(0.12)
    tf_2.margin_left = Inches(0.16)
    p_2t = tf_2.paragraphs[0]
    p_2t.text = "2. EARLY RISK AWARENESS & CASCADE DETECTION"
    p_2t.font.size = Pt(9.5)
    p_2t.font.bold = True
    p_2t.font.name = FONT_FAMILY
    p_2t.font.color.rgb = ALERT_ROSE
    p_2t.space_after = Pt(6)
    p_2t.alignment = PP_ALIGN.LEFT

    p2_items = [
        ("• 7–14 Day Predictive Horizon:", "Detects impending inventory breaches before emergency reserves are depleted."),
        ("• Dependency Cascade Tracing:", "Identifies hidden secondary impacts (e.g. generator fuel starvation causing lab freeze-outs)."),
        ("• Weather & Sea-Ice Correlation:", "Flags vessel approach hazards and blizzard windows that impact surface traverse safety."),
        ("• Root-Cause Attribution:", "Explains exactly why an alert fired rather than outputting cryptic anomaly scores."),
    ]
    for it, desc in p2_items:
        p = tf_2.add_paragraph()
        p.space_after = Pt(2.5)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = it + " "
        r1.font.bold = True
        r1.font.size = Pt(8.2)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = TEXT_NAVY
        r2 = p.add_run()
        r2.text = desc
        r2.font.bold = False
        r2.font.size = Pt(8.2)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_SECONDARY

    # Pillar 3: Defensible Decision Support & What-If Modeling
    p3 = add_card(slide, 0.8, 4.22, 5.75, 2.05, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1.2)
    tf_3 = p3.text_frame
    tf_3.margin_top = Inches(0.12)
    tf_3.margin_left = Inches(0.16)
    p_3t = tf_3.paragraphs[0]
    p_3t.text = "3. DEFENSIBLE DECISION SUPPORT & WHAT-IF SIMULATION"
    p_3t.font.size = Pt(9.5)
    p_3t.font.bold = True
    p_3t.font.name = FONT_FAMILY
    p_3t.font.color.rgb = POLAR_DEEP
    p_3t.space_after = Pt(6)
    p_3t.alignment = PP_ALIGN.LEFT

    p3_items = [
        ("• Safe Synthetic Experimentation:", "Operators test fuel rationing or load shedding in simulation prior to real-world deployment."),
        ("• Ranked Mitigation Trade-Offs:", "AI recommends prioritized operational responses with explicit runway deltas."),
        ("• Sovereign Human Command Gate:", "Preserves commander authority; no action is taken without explicit authorized review."),
        ("• Immutable Audit Traceability:", "Every decision, justification, and operator ID is cryptographically timestamped."),
    ]
    for it, desc in p3_items:
        p = tf_3.add_paragraph()
        p.space_after = Pt(2.5)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = it + " "
        r1.font.bold = True
        r1.font.size = Pt(8.2)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = TEXT_NAVY
        r2 = p.add_run()
        r2.text = desc
        r2.font.bold = False
        r2.font.size = Pt(8.2)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_SECONDARY

    # Pillar 4: Mission Resilience & Waste Elimination
    p4 = add_card(slide, 6.78, 4.22, 5.75, 2.05, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1.2)
    tf_4 = p4.text_frame
    tf_4.margin_top = Inches(0.12)
    tf_4.margin_left = Inches(0.16)
    p_4t = tf_4.paragraphs[0]
    p_4t.text = "4. MISSION RESILIENCE & RESOURCE EFFICIENCY"
    p_4t.font.size = Pt(9.5)
    p_4t.font.bold = True
    p_4t.font.name = FONT_FAMILY
    p_4t.font.color.rgb = SUCCESS_GREEN
    p_4t.space_after = Pt(6)
    p_4t.alignment = PP_ALIGN.LEFT

    p4_items = [
        ("• Prevention of Crisis Evacuations:", "Early mitigation avoids life-threatening mid-winter polar rescues and emergency air drops."),
        ("• Elimination of Duplicate Orders:", "Centralized cargo tracking prevents unnecessary intercontinental supply shipments."),
        ("• Environmental Treaty Compliance:", "Aids Antarctic Treaty waste management and hazmat tracking protocols."),
        ("• Continuous Field Readiness:", "Ensures research teams maintain unbroken power and life-support across the 240-day polar night."),
    ]
    for it, desc in p4_items:
        p = tf_4.add_paragraph()
        p.space_after = Pt(2.5)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = it + " "
        r1.font.bold = True
        r1.font.size = Pt(8.2)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = TEXT_NAVY
        r2 = p.add_run()
        r2.text = desc
        r2.font.bold = False
        r2.font.size = Pt(8.2)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_SECONDARY

    # Bottom Full-Width Horizontal Expansion Strip
    bot_card = add_card(slide, 0.8, 6.38, 11.733, 0.52, bg_color=BG_ACCENT_SOFT, border_color=BORDER_ACCENT, border_width=1)
    tf_bc = bot_card.text_frame
    tf_bc.margin_top = Inches(0.08)
    tf_bc.margin_left = Inches(0.16)
    p_bc = tf_bc.paragraphs[0]
    p_bc.alignment = PP_ALIGN.LEFT
    r_b1 = p_bc.add_run()
    r_b1.text = "SCALABILITY BEYOND POLAR EXPEDITIONS: "
    r_b1.font.bold = True
    r_b1.font.size = Pt(8.8)
    r_b1.font.name = FONT_FAMILY
    r_b1.font.color.rgb = POLAR_DEEP

    r_b2 = p_bc.add_run()
    r_b2.text = "Extreme High-Altitude Border Logistics (Siachen/Ladakh) · Disaster Relief Operations (NDRF) · Offshore Energy Platforms · Island Emergency Supply Chains"
    r_b2.font.bold = False
    r_b2.font.size = Pt(8.8)
    r_b2.font.name = FONT_FAMILY
    r_b2.font.color.rgb = TEXT_NAVY

    add_consistent_footer(slide, 5)


# ==============================================================================
# SLIDE 6: RESEARCH & REFERENCES
# ==============================================================================
def build_slide_6(prs):
    slide = create_base_slide(prs)
    add_consistent_header(
        slide,
        "DOMAIN RIGOR · OPERATIONAL REALITIES · SCIENTIFIC CITATIONS",
        "RESEARCH & OPERATIONAL REFERENCES",
        "Rooted in authentic Indian polar expedition mandates, international treaty frameworks, and empirical field logistics."
    )

    # 3 Academic Columns (Width = 3.77", Gap = 0.20", Height = 4.70", Lefts = 0.8, 4.78, 8.76)
    # Column 1: DOMAIN RESEARCH
    col1 = add_card(slide, 0.8, 2.05, 3.77, 4.70, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1.2)
    tf_1 = col1.text_frame
    tf_1.margin_top = Inches(0.14)
    tf_1.margin_left = Inches(0.16)
    tf_1.margin_right = Inches(0.16)

    p_1t = tf_1.paragraphs[0]
    p_1t.text = "1. DOMAIN & INSTITUTIONAL CONTEXT"
    p_1t.font.size = Pt(9.5)
    p_1t.font.bold = True
    p_1t.font.name = FONT_FAMILY
    p_1t.font.color.rgb = POLAR_BLUE
    p_1t.space_after = Pt(8)
    p_1t.alignment = PP_ALIGN.LEFT

    c1_content = [
        ("NCPOR Mandate:", "National Centre for Polar and Ocean Research (MoES, Govt. of India) coordinates scientific research and multi-modal logistics across polar sectors."),
        ("Indian Research Bases:", "Antarctica: Maitri (1989, Schirmacher Oasis) & Bharati (2012, Larsemann Hills).\nArctic: Himadri (2008, Ny-Ålesund, Svalbard, 78°55' N)."),
        ("Antarctic Treaty System (ATS):", "Strict governance under Madrid Protocol (1991) regulating waste repatriation, fuel bunkering, and zero environmental contamination."),
        ("COMNAP Standards:", "Council of Managers of National Antarctic Programs operational guidelines for inter-station SAR and cold-region safety."),
    ]
    for head, body in c1_content:
        p = tf_1.add_paragraph()
        p.space_after = Pt(6)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = head + "\n"
        r1.font.bold = True
        r1.font.size = Pt(8.5)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = TEXT_NAVY
        r2 = p.add_run()
        r2.text = body
        r2.font.bold = False
        r2.font.size = Pt(8)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_SECONDARY

    # Column 2: OPERATIONAL LOGISTICS INSIGHTS
    col2 = add_card(slide, 4.78, 2.05, 3.77, 4.70, bg_color=BG_WHITE, border_color=BORDER_CARD, border_width=1.2)
    tf_2 = col2.text_frame
    tf_2.margin_top = Inches(0.14)
    tf_2.margin_left = Inches(0.16)
    tf_2.margin_right = Inches(0.16)

    p_2t = tf_2.paragraphs[0]
    p_2t.text = "2. POLAR OPERATIONAL INSIGHTS"
    p_2t.font.size = Pt(9.5)
    p_2t.font.bold = True
    p_2t.font.name = FONT_FAMILY
    p_2t.font.color.rgb = POLAR_DEEP
    p_2t.space_after = Pt(8)
    p_2t.alignment = PP_ALIGN.LEFT

    c2_content = [
        ("Multi-Stage Resupply Corridor:", "Cargo moves across complex maritime pipelines: NCPOR Goa → Mumbai Port → Cape Town Gateway → Antarctic Ice Shelf → Continental Traverse."),
        ("The Winter Isolation Window:", "Stations face complete physical isolation for ~8 months (March–November); sea ice blocks vessels and storms ground flights."),
        ("Critical Power & Heating Spine:", "Station survival depends on uninterrupted Arctic-grade Jet A-1 / ATF fuel for combined heat & power (CHP) generators."),
        ("Environmental Retrograde:", "All station solid waste, sewage sludge, and used lubricants must be manifested, compacted, and shipped back to the mainland."),
    ]
    for head, body in c2_content:
        p = tf_2.add_paragraph()
        p.space_after = Pt(6)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = head + "\n"
        r1.font.bold = True
        r1.font.size = Pt(8.5)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = TEXT_NAVY
        r2 = p.add_run()
        r2.text = body
        r2.font.bold = False
        r2.font.size = Pt(8)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_SECONDARY

    # Column 3: OFFICIAL REFERENCES & PROJECT CODEBASE
    col3 = add_card(slide, 8.76, 2.05, 3.77, 4.70, bg_color=BG_CARD_TINT, border_color=BORDER_ACCENT, border_width=1.2)
    tf_3 = col3.text_frame
    tf_3.margin_top = Inches(0.14)
    tf_3.margin_left = Inches(0.16)
    tf_3.margin_right = Inches(0.16)

    p_3t = tf_3.paragraphs[0]
    p_3t.text = "3. CITATIONS & PROJECT REPOSITORY"
    p_3t.font.size = Pt(9.5)
    p_3t.font.bold = True
    p_3t.font.name = FONT_FAMILY
    p_3t.font.color.rgb = SUCCESS_GREEN
    p_3t.space_after = Pt(8)
    p_3t.alignment = PP_ALIGN.LEFT

    c3_content = [
        ("NCPOR Official Portal & Expedition Logs:", "National Centre for Polar and Ocean Research, Ministry of Earth Sciences, Govt. of India (ncpor.res.in)."),
        ("Ministry of Earth Sciences (MoES):", "Annual Reports & Indian Antarctic Research Operational Guidelines (moes.gov.in)."),
        ("Secretariat of the Antarctic Treaty:", "Protocol on Environmental Protection to the Antarctic Treaty — Annex III: Waste Disposal & Waste Management (ats.aq)."),
        ("COMNAP Operations Manual:", "Council of Managers of National Antarctic Programs — Station Logistics & Flight Safety Directives (comnap.aq)."),
        ("POLAR-AI Software Prototype:", "Smart India Hackathon 2026 Submission Repository:\ngithub.com/bhavishyaone1/POLAR-AI\nVerified React 18, Vite 8, PWA & Leaflet implementation."),
    ]
    for head, body in c3_content:
        p = tf_3.add_paragraph()
        p.space_after = Pt(6)
        p.alignment = PP_ALIGN.LEFT
        r1 = p.add_run()
        r1.text = head + "\n"
        r1.font.bold = True
        r1.font.size = Pt(8.5)
        r1.font.name = FONT_FAMILY
        r1.font.color.rgb = TEXT_NAVY
        r2 = p.add_run()
        r2.text = body
        r2.font.bold = False
        r2.font.size = Pt(7.8)
        r2.font.name = FONT_FAMILY
        r2.font.color.rgb = TEXT_SECONDARY

    add_consistent_footer(slide, 6)


# ==============================================================================
# MAIN RUNNER & BUILD PIPELINE
# ==============================================================================
def main():
    print("================================================================")
    print("  POLAR-AI: SIH 2026 OFFICIAL 6-SLIDE PRESENTATION BUILDER")
    print("================================================================")

    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    print("Building Slide 1: Team Details & Official Registration...")
    build_slide_1(prs)

    print("Building Slide 2: Problem Statement + Solution + Core USP...")
    build_slide_2(prs)

    print("Building Slide 3: Technical Approach (Diagram-First Architecture)...")
    build_slide_3(prs)

    print("Building Slide 4: Feasibility & Viability (Tested Codebase Matrix)...")
    build_slide_4(prs)

    print("Building Slide 5: Impact & Benefits (Mission Resilience)...")
    build_slide_5(prs)

    print("Building Slide 6: Research & References (Domain Citations)...")
    build_slide_6(prs)

    output_pptx = os.path.abspath("POLAR_AI_SIH_2026_IDEA_PRESENTATION_FINAL.pptx")
    prs.save(output_pptx)
    print(f"[SUCCESS] PPTX generated successfully: {output_pptx}")
    print(f"Total Slides: {len(prs.slides)}")

if __name__ == "__main__":
    main()
