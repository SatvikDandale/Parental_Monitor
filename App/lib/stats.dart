import 'package:flutter/cupertino.dart';
import 'package:charts_flutter/flutter.dart'as charts;
import 'package:flutter/material.dart';
import 'package:parental_monitor/usage.dart';

class Stats extends StatefulWidget{
  final List<Usage> usageList;
  const Stats(this.usageList);

  @override
  StatsState createState() => new StatsState();
}

class StatsState extends State<Stats>{
  
  @override
  Widget build(BuildContext context) {
    List<charts.Series<Usage,String>> series = [
      charts.Series(
        id: "Subscribers",
        data: widget.usageList,
        domainFn: (Usage series, _) => series.site,
        measureFn: (Usage series, _) => series.totalUsage,
      )
    ];
    return Scaffold(
      appBar: AppBar(
        title: Text("Statistics"),
      ),
      body: Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
              Container(
                child: Text(
                  "Internet usage of child",
                  style: Theme.of(context).textTheme.body2,
                ),
              ),
              Expanded(
                child:
                  charts.BarChart(series, animate: true),
              )
            ],
        ),
      ),
    );
  }
  
}