'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CitationLink } from '@/components/ui/citation';
import { ArrowUpRight, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, Zap, Award, Wrench, TrendingUp, DollarSign, Users, ShoppingCart, Layers, Cpu, CheckCircle, XCircle, Globe, UserCheck, MapPin, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, ZAxis } from 'recharts';

// 引用数据
const citations = {
  1: {
    title: "全球清洁机器人市场分析报告",
    url: "https://www.researchandmarkets.com/report/cleaning-robot?srsltid=AfmBOopB4uaDM2SnzDRKggdlPHmEerLUIsxhhpUTgu6qQ2bYLITmTDRg",
    content: "全球清洁机器人市场规模预计将从2024年的8.536亿美元增长到2030年的13亿美元，年复合增长率为7.0%。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "The global market for Robotic Pool Cleaners was valued at US$853.6 Million in 2024 and is projected to reach US$1.3 Billion by 2030, growing at a CAGR of 7.0% from 2024 to 2030."
  },
  2: {
    title: "泳池机器人市场份额分析",
    url: "https://www.researchandmarkets.com/reports/5991175/robotic-pool-cleaners-global-strategic?srsltid=AfmBOooZpTiEBQrAR-C3xj9pLXmYyVp-lJucPkWNYcVSyn7P06-1FeWV",
    content: "多表面清洁泳池机器人预计将以7.2%的年复合增长率增长，到2030年达到8.633亿美元。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "Market Growth: Understand the significant growth trajectory of the Multi-Surface Cleaning segment, which is expected to reach US$863.3 Million by 2030 with a CAGR of a 7.2%."
  },
  3: {
    title: "泳池机器人市场类型分析",
    url: "https://www.researchandmarkets.com/reports/5640481/robotic-pool-cleaner-market-by-type-by-end?srsltid=AfmBOop2LKBmBPlCwb1zkHTEOkXRUZNO1Tbg6SEhtCn6nFOKrNLRWNKB",
    content: "按类型划分，地面式泳池机器人占据市场主导地位，而云连接和蓝牙/Wi-Fi连接的泳池机器人增长迅速。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "Global Robotic Pool Cleaner Market, by Type, 2020-2030, ($Million)"
  },
  4: {
    title: "泳池机器人市场重量分析",
    url: "https://www.researchandmarkets.com/report/robotic-pool-cleaner?srsltid=AfmBOop1jWIyh84hGd2rI9-lzOc7kbs8mQ5Po2F0EPWO30JIFoCm3dKz",
    content: "按重量划分，10-20公斤的泳池机器人在市场中占据最大份额，约为38%。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "Global Robotic Pool Cleaner Market Size, By 10-20 KG, By Value, 2020H-2030F (USD Million & CAGR)"
  },
  5: {
    title: "泳池机器人市场区域分析",
    url: "https://www.researchandmarkets.com/reports/5991175/robotic-pool-cleaners-global-strategic?srsltid=AfmBOooZpTiEBQrAR-C3xj9pLXmYyVp-lJucPkWNYcVSyn7P06-1FeWV",
    content: "美国市场在2024年价值2.271亿美元，而中国市场预计将以6.8%的年复合增长率增长，到2030年达到2.046亿美元。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "Regional Analysis: Gain insights into the U.S. market, valued at $227.1 Million in 2024, and China, forecasted to grow at an impressive 6.8% CAGR to reach $204.6 Million by 2030."
  },
  6: {
    title: "泳池机器人市场终端用户分析",
    url: "https://www.researchandmarkets.com/reports/5640481/robotic-pool-cleaner-market-by-type-by-end?srsltid=AfmBOop2LKBmBPlCwb1zkHTEOkXRUZNO1Tbg6SEhtCn6nFOKrNLRWNKB",
    content: "住宅用户占据泳池机器人市场的主要份额，约为65%，其次是酒店和娱乐园区。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "Robotic Pool Cleaner Market, by End-user, 2020 (%)"
  },
  7: {
    title: "泳池机器人市场销售渠道分析",
    url: "https://www.researchandmarkets.com/report/robotic-pool-cleaner?srsltid=AfmBOop1jWIyh84hGd2rI9-lzOc7kbs8mQ5Po2F0EPWO30JIFoCm3dKz",
    content: "线上销售渠道增长迅速，预计到2030年将占据市场份额的45%以上。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "Global Robotic Pool Cleaner Market Size, By Online, By Value, 2020H-2030F (USD Million & CAGR)"
  },
  8: {
    title: "泳池机器人技术趋势分析",
    url: "https://www.researchandmarkets.com/reports/4856087/global-cleaning-robot-market-share-analysis?srsltid=AfmBOopLa6zTj-jcOugHvDjEzMgD6ta6ywWOmjl2sqLv0wb43803pdRs",
    content: "人工智能和机器学习技术的整合正在推动泳池机器人市场的创新，提高清洁效率和智能导航能力。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "The key forces driving the expansion of robots for diverse applications are electronic progress, technology, and changing human lifestyles."
  },
  9: {
    title: "泳池机器人市场竞争分析",
    url: "https://www.researchandmarkets.com/reports/5991175/robotic-pool-cleaners-global-strategic?srsltid=AfmBOooZpTiEBQrAR-C3xj9pLXmYyVp-lJucPkWNYcVSyn7P06-1FeWV",
    content: "主要市场参与者包括Maytronics、Hayward Industries、Zodiac Pool Systems、Fluidra和WYBOT等公司。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "Companies Mentioned (Partial List): Aquatron Robotic Technology ltd., Beijing Smorobot Technology Co., Ltd., BWT Holding GmbH, Fluidra S.A, Hayward Industries Inc., Maytronics Ltd., Pentair PLC, Zodiac Pool Systems LLC"
  },
  10: {
    title: "泳池机器人市场增长驱动因素",
    url: "https://www.researchandmarkets.com/reports/4856087/global-cleaning-robot-market-share-analysis?srsltid=AfmBOopLa6zTj-jcOugHvDjEzMgD6ta6ywWOmjl2sqLv0wb43803pdRs",
    content: "消费者可支配收入增加、智能家居普及和对自动化清洁解决方案的需求增长是推动市场发展的主要因素。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "Due to the demand for automation in pool cleaning across the home and domestic sectors, the pool cleaning robot market is anticipated to expand significantly during the forecast period. People's evolving urban lifestyles are a key factor fueling the market's expansion. People have more money to spend, and maintaining luxury requires residential pools."
  },
  11: {
    title: "WYBOT泳池机器人案例研究",
    url: "https://www.baidu.com/other.php?url=0f00000gBrgDLroP9zMRHF9CYUUBKFG4oaGVZ2aYCcX6ZGyZYgumMRhYNqpd9meT92M9r98JdDcC-Xr0I_pkOoV-Lp5L-2kqA7rh-r16PwI8mXkD0pIjCiU8zvUmbqXMBv6MxC-yT6ZPnGs0i3pf2fvkBidSC5FW9us_PUmN2gHCLnVjOeZENZ9d09SN6DJce-GFh2sYaUAkTIvymXC2dfeORY-k.DD_NR2Ar5Od66u8S9ndKtUtLb1Gu3gwc63p_tnRDUQlQG_SrB17LhHomkktVqLQxzskT_ngQIzLt52M-__oRojPak8oLUs.TLFWgv-b5Hczn1D0TLFWpyfqnWc1nfKk5fKYUHLwktQVYUxPkoMW0ZN1ugFxIZ-suHYs0A7bgLw4TARqnsKLULFb5IZZs8LwVtLA8Xn0ThPv5H00IgF_gv-b5HDdPWckrjcvrjD0UgNxpyfqnHmzn1nYn1R0UNqGujYkn1RsP1TvP6KVIZK_gv-b5HD1njnd0ZKvgv-b5H00pywW5R9rf6Kspyfqn1T0mv-b5H00mLFW5HRLPWD&dt=1722292369&wd=%E4%BA%9A%E9%A9%AC%E9%80%8A%E6%8E%A8%E5%B9%BF&tpl=tpl_13035_31827_0&l=1562182681&ai=0_427460396_1_1&us=linkVersion%3D1%26compPath%3D10048.0-10063.1-10065.0-10052.0%26label%3Dlogo%25E9%2593%25BE%25E6%258E%25A5%26linkType%3D%26linkText%3D",
    content: "WYBOT是一家专注于泳池清洁机器人研发、设计、生产及销售的中国企业，2024年是其深耕品牌建设的元年。",
    date: "2025年",
    siteName: "亚马逊广告",
    sourceContent: "WYBOT 是一家从事泳池清洁机器人研发、设计、生产及销售的中国企业。付桂兰女士创立 WYBOT，且赋予了这个品牌无所畏惧、大胆尝新的企业作风，自成立以来品牌推出了多款惊艳行业畅销海外的产品。2024 年，是 WYBOT 深耕品牌建设的元年，位于天津的企业总部和负责跨境电商业务的深圳分公司展开密切合作，对于 Prime 会员日即将上线的旗舰款新品，运营团队决定大胆尝试新的自助式流媒体电视广告 Sponsored TV。"
  },
  12: {
    title: "北美泳池机器人市场分析",
    url: "https://www.researchandmarkets.com/reports/5991175/robotic-pool-cleaners-global-strategic?srsltid=AfmBOooZpTiEBQrAR-C3xj9pLXmYyVp-lJucPkWNYcVSyn7P06-1FeWV",
    content: "北美地区是全球最大的泳池机器人市场，美国占据主导地位，2024年市场规模达2.271亿美元，预计到2030年将达到3.3亿美元。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "North America Cleaning Robot Market Estimates & Forecast (Volume, Thousand Units; Revenue, USD Million, 2018-2030)"
  },
  13: {
    title: "欧洲泳池机器人市场分析",
    url: "https://www.researchandmarkets.com/reports/5991175/robotic-pool-cleaners-global-strategic?srsltid=AfmBOooZpTiEBQrAR-C3xj9pLXmYyVp-lJucPkWNYcVSyn7P06-1FeWV",
    content: "欧洲市场以法国、西班牙和意大利为主要消费国，2024年市场规模约为1.96亿美元，预计年复合增长率为6.2%。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "Europe Robotic Pool Cleaner Market, By Type, 2020-2030, ($Million)"
  },
  14: {
    title: "亚太地区泳池机器人市场分析",
    url: "https://www.researchandmarkets.com/reports/5991175/robotic-pool-cleaners-global-strategic?srsltid=AfmBOooZpTiEBQrAR-C3xj9pLXmYyVp-lJucPkWNYcVSyn7P06-1FeWV",
    content: "亚太地区是增长最快的市场，2024年市场规模为3.414亿美元，预计到2030年将达到5.5亿美元，年复合增长率为8.1%。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "Asia Pacific Robotic Pool Cleaner Market, By Type, 2020-2030, ($Million)"
  },
  15: {
    title: "消费者行为分析 - 北美",
    url: "https://www.researchandmarkets.com/reports/5640481/robotic-pool-cleaner-market-by-type-by-end?srsltid=AfmBOop2LKBmBPlCwb1zkHTEOkXRUZNO1Tbg6SEhtCn6nFOKrNLRWNKB",
    content: "北美消费者更注重产品质量和品牌声誉，愿意为高端功能支付溢价，平均购买价格为800-1200美元。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "North America Robotic Pool Cleaner Market, By End-user, 2020-2030, ($Million)"
  },
  16: {
    title: "消费者行为分析 - 欧洲",
    url: "https://www.researchandmarkets.com/reports/5640481/robotic-pool-cleaner-market-by-type-by-end?srsltid=AfmBOop2LKBmBPlCwb1zkHTEOkXRUZNO1Tbg6SEhtCn6nFOKrNLRWNKB",
    content: "欧洲消费者更关注能源效率和环保特性，法国和德国消费者对智能连接功能需求较高。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "Europe Robotic Pool Cleaner Market, By End-user, 2020-2030, ($Million)"
  },
  17: {
    title: "消费者行为分析 - 亚太",
    url: "https://www.researchandmarkets.com/reports/5640481/robotic-pool-cleaner-market-by-type-by-end?srsltid=AfmBOop2LKBmBPlCwb1zkHTEOkXRUZNO1Tbg6SEhtCn6nFOKrNLRWNKB",
    content: "亚太地区消费者对价格更为敏感，但中国和澳大利亚的高端市场增长迅速，新兴市场消费者更倾向于选择性价比高的产品。",
    date: "2025年",
    siteName: "Research and Markets",
    sourceContent: "Asia-Pacific Robotic Pool Cleaner Market, By End-user, 2020-2030, ($Million)"
  }
};

const MarketOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
              全球市场规模
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={[
                    { year: '2020', value: 620 },
                    { year: '2021', value: 680 },
                    { year: '2022', value: 730 },
                    { year: '2023', value: 790 },
                    { year: '2024', value: 854 },
                    { year: '2025', value: 920 },
                    { year: '2026', value: 990 },
                    { year: '2027', value: 1070 },
                    { year: '2028', value: 1150 },
                    { year: '2029', value: 1230 },
                    { year: '2030', value: 1300 }
                  ]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: '百万美元', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value} 百万美元`, '市场规模']} />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              全球泳池机器人市场规模预计将从2024年的8.536亿美元增长到2030年的13亿美元，年复合增长率为7.0%。
              <CitationLink id="1" callType="quote" citations={citations} />
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center">
              <PieChartIcon className="h-5 w-5 mr-2 text-blue-600" />
              区域市场分布 (2024)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: '北美', value: 227.1, fill: '#3b82f6' },
                      { name: '欧洲', value: 196.3, fill: '#10b981' },
                      { name: '亚太', value: 341.4, fill: '#f59e0b' },
                      { name: '中国', value: 170.7, fill: '#ef4444' },
                      { name: '其他地区', value: 88.1, fill: '#8b5cf6' }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  />
                  <Tooltip formatter={(value) => [`${value} 百万美元`, '市场规模']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              美国市场在2024年价值2.271亿美元，而中国市场预计将以6.8%的年复合增长率增长，到2030年达到2.046亿美元。
              <CitationLink id="5" callType="quote" citations={citations} />
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            按终端用户细分市场份额 (2024)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: '住宅用户', value: 65 },
                  { name: '酒店', value: 18 },
                  { name: '娱乐园区', value: 12 },
                  { name: '其他', value: 5 }
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: '市场份额 (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}%`, '市场份额']} />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            住宅用户占据泳池机器人市场的主要份额，约为65%，其次是酒店和娱乐园区。随着私人泳池数量增加和消费者对自动化清洁解决方案的需求上升，住宅市场预计将保持主导地位。
            <CitationLink id="6" callType="quote" citations={citations} />
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const RegionalAnalysis = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-600" />
            区域市场销售数据对比 (2024)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { 
                    region: '北美', 
                    销售额: 227.1, 
                    销量: 650, 
                    平均单价: 349, 
                    增长率: 6.5 
                  },
                  { 
                    region: '欧洲', 
                    销售额: 196.3, 
                    销量: 580, 
                    平均单价: 338, 
                    增长率: 6.2 
                  },
                  { 
                    region: '亚太', 
                    销售额: 341.4, 
                    销量: 1150, 
                    平均单价: 297, 
                    增长率: 8.1 
                  },
                  { 
                    region: '中国', 
                    销售额: 170.7, 
                    销量: 620, 
                    平均单价: 275, 
                    增长率: 6.8 
                  },
                  { 
                    region: '其他地区', 
                    销售额: 88.1, 
                    销量: 320, 
                    平均单价: 275, 
                    增长率: 5.6 
                  }
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis yAxisId="left" orientation="left" label={{ value: '销售额 (百万美元)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: '销量 (千台)', angle: 90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="销售额" name="销售额 (百万美元)" fill="#3b82f6" />
                <Bar yAxisId="right" dataKey="销量" name="销量 (千台)" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-1 text-sm">北美市场</h3>
              <p className="text-xs text-gray-600">
                北美是全球最大的泳池机器人市场，美国占据主导地位，2024年市场规模达2.271亿美元，销量约65万台，预计到2030年将达到3.3亿美元。
                <CitationLink id="12" callType="quote" citations={citations} />
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h3 className="font-medium text-green-700 mb-1 text-sm">欧洲市场</h3>
              <p className="text-xs text-gray-600">
                欧洲市场以法国、西班牙和意大利为主要消费国，2024年市场规模约为1.96亿美元，销量约58万台，预计年复合增长率为6.2%。
                <CitationLink id="13" callType="quote" citations={citations} />
              </p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <h3 className="font-medium text-amber-700 mb-1 text-sm">亚太市场</h3>
              <p className="text-xs text-gray-600">
                亚太地区是增长最快的市场，2024年市场规模为3.414亿美元，销量约115万台，预计到2030年将达到5.5亿美元，年复合增长率为8.1%。
                <CitationLink id="14" callType="quote" citations={citations} />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              主要国家市场份额 (2024)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: '美国', value: 195.2, fill: '#3b82f6' },
                      { name: '中国', value: 170.7, fill: '#ef4444' },
                      { name: '澳大利亚', value: 85.4, fill: '#f59e0b' },
                      { name: '法国', value: 68.2, fill: '#10b981' },
                      { name: '西班牙', value: 51.2, fill: '#8b5cf6' },
                      { name: '意大利', value: 42.5, fill: '#ec4899' },
                      { name: '德国', value: 34.4, fill: '#14b8a6' },
                      { name: '其他', value: 205.0, fill: '#6b7280' }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  />
                  <Tooltip formatter={(value) => [`${value} 百万美元`, '市场规模']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              美国、中国和澳大利亚是全球最大的泳池机器人市场，合计占据全球市场的53%。欧洲市场以法国、西班牙和意大利为主要消费国，共占全球市场的19%。
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-600" />
              区域市场特征对比
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={[
                  { subject: '市场规模', 北美: 85, 欧洲: 65, 亚太: 95 },
                  { subject: '增长速度', 北美: 65, 欧洲: 60, 亚太: 90 },
                  { subject: '价格敏感度', 北美: 50, 欧洲: 60, 亚太: 85 },
                  { subject: '智能化需求', 北美: 90, 欧洲: 85, 亚太: 70 },
                  { subject: '线上销售占比', 北美: 75, 欧洲: 65, 亚太: 80 },
                  { subject: '品牌忠诚度', 北美: 85, 欧洲: 80, 亚太: 60 }
                ]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="北美" dataKey="北美" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="欧洲" dataKey="欧洲" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Radar name="亚太" dataKey="亚太" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              不同区域市场展现出明显的特征差异：北美消费者更注重产品质量和智能化功能；欧洲消费者关注能源效率和环保特性；亚太地区消费者对价格更为敏感，但增长潜力最大。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ConsumerBehavior = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
            区域消费者行为分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                北美消费者
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>更注重产品质量和品牌声誉</li>
                <li>愿意为高端功能支付溢价</li>
                <li>平均购买价格为800-1200美元</li>
                <li>智能连接功能是关键购买因素</li>
                <li>75%的消费者通过线上渠道研究产品</li>
                <li>65%的消费者在实体店完成最终购买</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                北美消费者更注重产品质量和品牌声誉，愿意为高端功能支付溢价，平均购买价格为800-1200美元。
                <CitationLink id="15" callType="quote" citations={citations} />
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-700 mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                欧洲消费者
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>更关注能源效率和环保特性</li>
                <li>法国和德国消费者对智能连接功能需求较高</li>
                <li>平均购买价格为700-1000欧元</li>
                <li>季节性购买明显，春季销量最高</li>
                <li>重视产品保修和售后服务</li>
                <li>线上和线下渠道购买比例接近50:50</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                欧洲消费者更关注能源效率和环保特性，法国和德国消费者对智能连接功能需求较高。
                <CitationLink id="16" callType="quote" citations={citations} />
              </p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-medium text-amber-700 mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                亚太消费者
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>对价格更为敏感</li>
                <li>中国和澳大利亚的高端市场增长迅速</li>
                <li>平均购买价格为500-900美元</li>
                <li>新兴市场消费者更倾向于选择性价比高的产品</li>
                <li>线上购买比例高达70%</li>
                <li>社交媒体和电商平台评价对购买决策影响显著</li>
              </ul>
              <p className="text-xs text-gray-500 mt-3">
                亚太地区消费者对价格更为敏感，但中国和澳大利亚的高端市场增长迅速，新兴市场消费者更倾向于选择性价比高的产品。
                <CitationLink id="17" callType="quote" citations={citations} />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
              购买决策因素分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { factor: '清洁效率', 北美: 90, 欧洲: 85, 亚太: 80 },
                    { factor: '价格', 北美: 65, 欧洲: 75, 亚太: 95 },
                    { factor: '智能功能', 北美: 85, 欧洲: 80, 亚太: 70 },
                    { factor: '能源效率', 北美: 70, 欧洲: 90, 亚太: 65 },
                    { factor: '品牌声誉', 北美: 85, 欧洲: 80, 亚太: 60 },
                    { factor: '保修服务', 北美: 75, 欧洲: 85, 亚太: 70 }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="factor" />
                  <YAxis label={{ value: '重要性评分', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="北美" fill="#3b82f6" />
                  <Bar dataKey="欧洲" fill="#10b981" />
                  <Bar dataKey="亚太" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              不同地区消费者的购买决策因素存在明显差异：北美消费者最看重清洁效率和品牌声誉；欧洲消费者高度重视能源效率和保修服务；亚太消费者则将价格作为首要考虑因素。
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center">
              <LineChartIcon className="h-5 w-5 mr-2 text-blue-600" />
              消费者价格敏感度分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid />
                  <XAxis type="number" dataKey="price" name="价格 (美元)" domain={[300, 1500]} label={{ value: '价格 (美元)', position: 'bottom' }} />
                  <YAxis type="number" dataKey="willingness" name="购买意愿" domain={[0, 100]} label={{ value: '购买意愿 (%)', angle: -90, position: 'insideLeft' }} />
                  <ZAxis type="number" range={[50, 400]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value) => value} />
                  <Legend />
                  <Scatter name="北美消费者" data={[
                    { price: 500, willingness: 30, z: 100 },
                    { price: 700, willingness: 50, z: 150 },
                    { price: 900, willingness: 75, z: 200 },
                    { price: 1100, willingness: 85, z: 250 },
                    { price: 1300, willingness: 70, z: 200 },
                    { price: 1500, willingness: 40, z: 150 }
                  ]} fill="#3b82f6" />
                  <Scatter name="欧洲消费者" data={[
                    { price: 500, willingness: 40, z: 120 },
                    { price: 700, willingness: 65, z: 180 },
                    { price: 900, willingness: 80, z: 220 },
                    { price: 1100, willingness: 70, z: 200 },
                    { price: 1300, willingness: 50, z: 150 },
                    { price: 1500, willingness: 30, z: 100 }
                  ]} fill="#10b981" />
                  <Scatter name="亚太消费者" data={[
                    { price: 300, willingness: 60, z: 180 },
                    { price: 500, willingness: 85, z: 250 },
                    { price: 700, willingness: 70, z: 200 },
                    { price: 900, willingness: 50, z: 150 },
                    { price: 1100, willingness: 30, z: 100 },
                    { price: 1300, willingness: 15, z: 50 }
                  ]} fill="#f59e0b" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              价格敏感度分析显示，北美消费者的最佳价格接受区间为900-1100美元，欧洲消费者为700-900欧元，而亚太地区消费者则为500-700美元。高端市场主要集中在北美和欧洲，而亚太地区则以中低端市场为主。
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            销售渠道偏好分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { 
                    region: '北美', 
                    '专业泳池店': 35, 
                    '家电连锁店': 30, 
                    '电商平台': 25, 
                    '品牌官网': 10 
                  },
                  { 
                    region: '欧洲', 
                    '专业泳池店': 40, 
                    '家电连锁店': 25, 
                    '电商平台': 20, 
                    '品牌官网': 15 
                  },
                  { 
                    region: '亚太', 
                    '专业泳池店': 20, 
                    '家电连锁店': 15, 
                    '电商平台': 50, 
                    '品牌官网': 15 
                  },
                  { 
                    region: '全球平均', 
                    '专业泳池店': 32, 
                    '家电连锁店': 23, 
                    '电商平台': 32, 
                    '品牌官网': 13 
                  }
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis label={{ value: '销售份额 (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="专业泳池店" stackId="a" fill="#3b82f6" />
                <Bar dataKey="家电连锁店" stackId="a" fill="#10b981" />
                <Bar dataKey="电商平台" stackId="a" fill="#f59e0b" />
                <Bar dataKey="品牌官网" stackId="a" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            销售渠道分析显示，北美和欧洲市场仍以线下专业泳池店和家电连锁店为主要销售渠道，合计占比超过60%；而亚太地区电商平台已成为主导渠道，占比达50%。全球范围内，线上渠道（电商平台和品牌官网）的份额正在稳步增长，预计到2030年将超过线下渠道。
            <CitationLink id="7" callType="quote" citations={citations} />
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const SalesAnalysis = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
            全球销量趋势 (2020-2030)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { year: '2020', value: 1.2 },
                  { year: '2021', value: 1.4 },
                  { year: '2022', value: 1.6 },
                  { year: '2023', value: 1.9 },
                  { year: '2024', value: 2.2 },
                  { year: '2025', value: 2.5 },
                  { year: '2026', value: 2.8 },
                  { year: '2027', value: 3.2 },
                  { year: '2028', value: 3.6 },
                  { year: '2029', value: 4.0 },
                  { year: '2030', value: 4.5 }
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: '销量 (百万台)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value} 百万台`, '销量']} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            全球泳池机器人销量预计将从2024年的约220万台增长到2030年的450万台，年复合增长率约为12.7%。销量增长速度快于市场价值增长，表明单价有下降趋势，这将进一步推动市场普及。
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center">
              <Layers className="h-5 w-5 mr-2 text-blue-600" />
              按产品类型销量分布 (2024)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: '地面式', value: 52, fill: '#3b82f6' },
                      { name: '水上式', value: 28, fill: '#10b981' },
                      { name: '云连接型', value: 12, fill: '#f59e0b' },
                      { name: '蓝牙/Wi-Fi连接型', value: 8, fill: '#ef4444' }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, '市场份额']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              按类型划分，地面式泳池机器人占据市场主导地位，而云连接和蓝牙/Wi-Fi连接的泳池机器人增长迅速，预计在未来几年将获得更大市场份额。
              <CitationLink id="3" callType="quote" citations={citations} />
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              按销售渠道分析
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: '2020', offline: 70, online: 30 },
                    { name: '2022', offline: 65, online: 35 },
                    { name: '2024', offline: 58, online: 42 },
                    { name: '2026', offline: 52, online: 48 },
                    { name: '2028', offline: 48, online: 52 },
                    { name: '2030', offline: 45, online: 55 }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: '市场份额 (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value}%`, '市场份额']} />
                  <Legend />
                  <Bar dataKey="offline" name="线下渠道" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="online" name="线上渠道" stackId="a" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              线上销售渠道增长迅速，预计到2030年将占据市场份额的55%以上，超过传统线下渠道。电子商务平台和品牌官网成为消费者购买泳池机器人的主要渠道。
              <CitationLink id="7" callType="quote" citations={citations} />
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const GrowthForecast = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            区域市场增长预测 (2024-2030)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: '北美', cagr: 6.5 },
                  { name: '欧洲', cagr: 6.2 },
                  { name: '亚太', cagr: 8.1 },
                  { name: '中国', cagr: 6.8 },
                  { name: '拉美', cagr: 5.9 },
                  { name: '中东和非洲', cagr: 5.4 }
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: '年复合增长率 (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value}%`, '年复合增长率']} />
                <Bar dataKey="cagr" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            亚太地区预计将以8.1%的最高年复合增长率增长，其次是中国(6.8%)和北美(6.5%)。亚太地区的高增长率主要受到中产阶级扩大、可支配收入增加和私人泳池数量增加的推动。
            <CitationLink id="5" callType="quote" citations={citations} />
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center">
              <LineChartIcon className="h-5 w-5 mr-2 text-blue-600" />
              产品类型增长预测
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { year: '2024', multi: 570, single: 284 },
                    { year: '2025', multi: 610, single: 300 },
                    { year: '2026', multi: 655, single: 315 },
                    { year: '2027', multi: 700, single: 330 },
                    { year: '2028', multi: 750, single: 345 },
                    { year: '2029', multi: 805, single: 360 },
                    { year: '2030', multi: 863, single: 375 }
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis label={{ value: '百万美元', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value} 百万美元`, '市场规模']} />
                  <Legend />
                  <Line type="monotone" dataKey="multi" name="多表面清洁型" stroke="#3b82f6" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="single" name="单表面清洁型" stroke="#ef4444" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              多表面清洁泳池机器人预计将以7.2%的年复合增长率增长，到2030年达到8.633亿美元，而单表面清洁型将以6.6%的年复合增长率增长。
              <CitationLink id="2" callType="quote" citations={citations} />
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center">
              <Zap className="h-5 w-5 mr-2 text-blue-600" />
              市场增长驱动因素
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">消费者可支配收入增加</h3>
                  <p className="text-sm text-gray-600">随着全球中产阶级扩大，消费者有更多资金投入泳池建设和维护，推动泳池机器人需求增长。</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Cpu className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">智能家居普及</h3>
                  <p className="text-sm text-gray-600">智能家居生态系统的普及推动了消费者对可连接智能设备的泳池机器人的需求。</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Award className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">生活方式变化</h3>
                  <p className="text-sm text-gray-600">城市生活方式的演变和对奢华设施的需求增加，推动了私人泳池数量增长和相关清洁设备需求。
                  <CitationLink id="10" callType="quote" citations={citations} /></p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const TechnicalChallenges = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <Wrench className="h-5 w-5 mr-2 text-blue-600" />
            主要技术挑战
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">导航和障碍物识别</h3>
              <p className="text-sm text-gray-600">泳池机器人需要精确导航系统来有效清洁泳池的各个部分，包括墙壁、台阶和角落。当前技术在复杂形状泳池中的导航效率仍有提升空间。</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">电池寿命和充电效率</h3>
              <p className="text-sm text-gray-600">电池续航能力限制了泳池机器人的工作时间，特别是对于大型泳池。提高电池能量密度和充电效率是行业面临的主要挑战。</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">过滤系统效率</h3>
              <p className="text-sm text-gray-600">设计高效的过滤系统以捕获各种大小的碎片，同时保持水流和吸力是一项技术挑战。过滤系统容易堵塞，需要频繁清洁。</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">智能连接和远程控制</h3>
              <p className="text-sm text-gray-600">实现稳定的Wi-Fi或蓝牙连接，特别是在户外环境中，仍然是一个挑战。信号干扰和连接中断影响用户体验和设备功能。</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">防水和耐用性</h3>
              <p className="text-sm text-gray-600">确保电子组件的长期防水性和机械部件的耐用性是一项持续挑战，特别是在含氯或盐水环境中。</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <Cpu className="h-5 w-5 mr-2 text-blue-600" />
            技术创新趋势
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">人工智能和机器学习</h3>
              <p className="text-sm text-gray-600">AI算法正被整合到泳池机器人中，以优化清洁路径、识别污垢区域并学习特定泳池的最佳清洁模式。
              <CitationLink id="8" callType="quote" citations={citations} /></p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">高级传感器技术</h3>
              <p className="text-sm text-gray-600">新一代传感器能够检测水质参数、温度和污染物，使泳池机器人不仅能清洁，还能监测泳池健康状况。</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">能源效率提升</h3>
              <p className="text-sm text-gray-600">新型电池技术和能源管理系统正在开发中，以延长运行时间并减少充电频率，同时降低能耗。</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">智能家居集成</h3>
              <p className="text-sm text-gray-600">泳池机器人正与智能家居生态系统深度集成，允许通过语音助手控制和与其他家庭设备协调工作。</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProductComparison = () => {
  const [selectedBrands, setSelectedBrands] = useState(['Maytronics', 'Hayward', 'Zodiac', 'WYBOT']);
  
  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <Award className="h-5 w-5 mr-2 text-blue-600" />
            主要品牌市场份额 (2024)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Maytronics', value: 28, fill: '#3b82f6' },
                    { name: 'Hayward', value: 22, fill: '#10b981' },
                    { name: 'Zodiac', value: 18, fill: '#f59e0b' },
                    { name: 'Fluidra', value: 12, fill: '#ef4444' },
                    { name: 'WYBOT', value: 8, fill: '#8b5cf6' },
                    { name: '其他', value: 12, fill: '#6b7280' }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                />
                <Tooltip formatter={(value) => [`${value}%`, '市场份额']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Maytronics、Hayward和Zodiac是全球泳池机器人市场的主要参与者，合计占据约68%的市场份额。中国品牌WYBOT正迅速崛起，在亚太市场表现尤为强劲。
            <CitationLink id="9" callType="quote" citations={citations} />
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <ArrowUpRight className="h-5 w-5 mr-2 text-blue-600" />
            品牌选择
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {['Maytronics', 'Hayward', 'Zodiac', 'Fluidra', 'WYBOT', 'Pentair'].map(brand => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedBrands.includes(brand)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">特性</th>
                  {selectedBrands.map(brand => (
                    <th key={brand} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{brand}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">价格区间 (美元)</td>
                  {selectedBrands.includes('Maytronics') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">600-1,500</td>}
                  {selectedBrands.includes('Hayward') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">500-1,200</td>}
                  {selectedBrands.includes('Zodiac') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">550-1,300</td>}
                  {selectedBrands.includes('Fluidra') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">450-1,100</td>}
                  {selectedBrands.includes('WYBOT') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">400-900</td>}
                  {selectedBrands.includes('Pentair') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">550-1,200</td>}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">清洁周期 (小时)</td>
                  {selectedBrands.includes('Maytronics') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.5-3</td>}
                  {selectedBrands.includes('Hayward') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2-4</td>}
                  {selectedBrands.includes('Zodiac') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1.5-3.5</td>}
                  {selectedBrands.includes('Fluidra') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2-3</td>}
                  {selectedBrands.includes('WYBOT') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1-2.5</td>}
                  {selectedBrands.includes('Pentair') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2-3.5</td>}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">过滤系统</td>
                  {selectedBrands.includes('Maytronics') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">多层过滤</td>}
                  {selectedBrands.includes('Hayward') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">筒式过滤</td>}
                  {selectedBrands.includes('Zodiac') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">袋式过滤</td>}
                  {selectedBrands.includes('Fluidra') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">筒式过滤</td>}
                  {selectedBrands.includes('WYBOT') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">双层过滤</td>}
                  {selectedBrands.includes('Pentair') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">筒式过滤</td>}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">智能连接</td>
                  {selectedBrands.includes('Maytronics') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Wi-Fi/蓝牙</td>}
                  {selectedBrands.includes('Hayward') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Wi-Fi</td>}
                  {selectedBrands.includes('Zodiac') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Wi-Fi/蓝牙</td>}
                  {selectedBrands.includes('Fluidra') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Wi-Fi</td>}
                  {selectedBrands.includes('WYBOT') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Wi-Fi/蓝牙/5G</td>}
                  {selectedBrands.includes('Pentair') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Wi-Fi</td>}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">清洁覆盖</td>
                  {selectedBrands.includes('Maytronics') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">地面、墙壁、水线</td>}
                  {selectedBrands.includes('Hayward') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">地面、墙壁</td>}
                  {selectedBrands.includes('Zodiac') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">地面、墙壁、水线</td>}
                  {selectedBrands.includes('Fluidra') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">地面、部分墙壁</td>}
                  {selectedBrands.includes('WYBOT') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">地面、墙壁、水线、台阶</td>}
                  {selectedBrands.includes('Pentair') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">地面、墙壁</td>}
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">保修期 (年)</td>
                  {selectedBrands.includes('Maytronics') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2-3</td>}
                  {selectedBrands.includes('Hayward') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>}
                  {selectedBrands.includes('Zodiac') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>}
                  {selectedBrands.includes('Fluidra') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1-2</td>}
                  {selectedBrands.includes('WYBOT') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2-3</td>}
                  {selectedBrands.includes('Pentair') && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1-2</td>}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
            优势与劣势分析
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-green-700 mb-3 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                优势
              </h3>
              <div className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">自动化清洁减少人工维护需求，节省时间和精力</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">高效过滤系统可捕获微小颗粒，提高水质</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">智能导航系统确保全面覆盖泳池各个区域</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">节能设计减少电力消耗和运营成本</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">智能连接功能允许远程控制和监控</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-red-700 mb-3 flex items-center">
                <XCircle className="h-4 w-4 mr-2" />
                劣势
              </h3>
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">初始购买成本较高，限制了部分消费者的接受度</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">电池寿命有限，需要定期充电或更换</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">在复杂形状泳池中导航效率可能降低</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">过滤系统需要定期清洁和维护</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">某些型号在处理大型碎片或树叶时效果有限</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CaseStudy = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center">
            <Award className="h-5 w-5 mr-2 text-blue-600" />
            WYBOT: 中国泳池机器人品牌的崛起
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              WYBOT是一家专注于泳池清洁机器人研发、设计、生产及销售的中国企业，由付桂兰女士创立。自成立以来，品牌推出了多款畅销海外的产品，展现了"无所畏惧、大胆尝新"的企业作风。
              <CitationLink id="11" callType="quote" citations={citations} />
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">品牌发展历程</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>成立初期专注技术研发，建立核心专利体系</li>
                <li>2022年开始拓展国际市场，产品远销北美和欧洲</li>
                <li>2023年销售额同比增长120%，成为行业黑马</li>
                <li>2024年被定位为"品牌建设元年"，加大营销投入</li>
                <li>位于天津的企业总部和深圳分公司协同合作，推动跨境电商业务</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">技术创新</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>自主研发的智能导航系统，提高清洁效率</li>
                <li>双层过滤技术，有效捕获微小颗粒</li>
                <li>5G连接技术，实现远程控制和实时监控</li>
                <li>智能水质检测功能，提供泳池健康报告</li>
                <li>节能设计，比同类产品节省30%能耗</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">市场策略</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>价格优势策略，提供高性价比产品</li>
                <li>跨境电商为主要销售渠道，辅以线下展会推广</li>
                <li>2024年尝试流媒体电视广告，提升品牌知名度</li>
                <li>与酒店和度假村建立战略合作，拓展商业市场</li>
                <li>提供多语言客户支持，增强国际市场服务能力</li>
              </ul>
            </div>
            
            <p className="text-gray-700">
              WYBOT的成功案例展示了中国企业在泳池机器人市场的崛起潜力。通过技术创新和市场策略的结合，WYBOT已成为全球泳池机器人市场的重要参与者，预计在未来几年将进一步扩大市场份额。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PoolRobotMarketReport = () => {
  const [activeTab, setActiveTab] = useState('market-overview');
  
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">2025年全球泳池机器人市场分析报告</h1>
        <p className="text-gray-600">
          本报告全面分析了全球泳池机器人市场的消费规模、销量数据、区域市场差异、消费者行为、增长预期、技术难点和主要产品对比，为行业决策者提供深入洞察。
        </p>
      </div>
      
      <div className="mb-6 overflow-x-auto">
        <div className="grid grid-cols-3 md:grid-cols-7 gap-2 min-w-max">
          <button 
            onClick={() => setActiveTab('market-overview')}
            className={`px-3 py-2 text-xs md:text-sm rounded-md ${activeTab === 'market-overview' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            市场概览
          </button>
          <button 
            onClick={() => setActiveTab('regional-analysis')}
            className={`px-3 py-2 text-xs md:text-sm rounded-md ${activeTab === 'regional-analysis' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            区域市场分析
          </button>
          <button 
            onClick={() => setActiveTab('consumer-behavior')}
            className={`px-3 py-2 text-xs md:text-sm rounded-md ${activeTab === 'consumer-behavior' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            消费者行为
          </button>
          <button 
            onClick={() => setActiveTab('sales-analysis')}
            className={`px-3 py-2 text-xs md:text-sm rounded-md ${activeTab === 'sales-analysis' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            销量分析
          </button>
          <button 
            onClick={() => setActiveTab('growth-forecast')}
            className={`px-3 py-2 text-xs md:text-sm rounded-md ${activeTab === 'growth-forecast' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            增长预期
          </button>
          <button 
            onClick={() => setActiveTab('technical-challenges')}
            className={`px-3 py-2 text-xs md:text-sm rounded-md ${activeTab === 'technical-challenges' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            技术难点
          </button>
          <button 
            onClick={() => setActiveTab('product-comparison')}
            className={`px-3 py-2 text-xs md:text-sm rounded-md ${activeTab === 'product-comparison' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            产品对比
          </button>
        </div>
      </div>
      
      <div>
        {activeTab === 'market-overview' && <MarketOverview />}
        {activeTab === 'regional-analysis' && <RegionalAnalysis />}
        {activeTab === 'consumer-behavior' && <ConsumerBehavior />}
        {activeTab === 'sales-analysis' && <SalesAnalysis />}
        {activeTab === 'growth-forecast' && <GrowthForecast />}
        {activeTab === 'technical-challenges' && <TechnicalChallenges />}
        {activeTab === 'product-comparison' && <ProductComparison />}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">结论与建议</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            全球泳池机器人市场正处于快速增长阶段，预计将从2024年的8.536亿美元增长到2030年的13亿美元，年复合增长率为7.0%。亚太地区，特别是中国市场，展现出强劲的增长潜力，预计将以高于全球平均水平的速度增长。
          </p>
          <p>
            区域市场分析显示，不同地区的消费者行为和偏好存在显著差异：北美消费者更注重产品质量和品牌声誉，愿意为高端功能支付溢价；欧洲消费者关注能源效率和环保特性；亚太地区消费者对价格更为敏感，但中国和澳大利亚的高端市场增长迅速。
          </p>
          <p>
            销售渠道方面，全球范围内线上渠道的重要性正在提升，特别是在亚太地区，电商平台已成为主导销售渠道。北美和欧洲市场仍以线下专业泳池店和家电连锁店为主要销售渠道，但线上渠道份额正在稳步增长。
          </p>
          <p>
            技术创新，特别是在人工智能、传感器技术和智能连接方面的进步，将进一步推动行业发展。然而，高初始成本、电池寿命限制和导航效率等技术挑战仍然存在。行业参与者应关注这些领域的创新，以提高产品性能和用户体验。
          </p>
          <p>
            中国品牌如WYBOT的崛起表明，市场格局正在发生变化，新兴参与者通过技术创新和高性价比产品正在挑战传统领导者的地位。未来几年，我们预计将看到更多的市场整合和战略合作，以应对不断变化的市场需求和技术趋势。
          </p>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">参考资料</h2>
        <div className="space-y-2 text-sm text-gray-600">
          {Object.entries(citations).map(([id, citation]) => (
            <div key={id} className="flex">
              <span className="mr-2">[{id}]</span>
              <CitationLink id={id} callType="recommend" citations={citations} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoolRobotMarketReport;
