'use strict';

/* This is an example directive. Doesn't really do anything. However, this presents a good
opportunity to set a precedent for how we document our directives, like so:

<div sm-add-item ... ng-model='<array to add to>' ></div>
Adds an item to <array to add to> where this array is specified in the ng-model attribute of the
div smAddItem rests on. smAddItem must be attached to a div as it will not init its own elements.
*/
angular.module('remembrallApp.d3Directives', ['remembrallApp.d3Services'])
  .directive('streakChart', ['d3Service',
    function (d3Service) {
      return {
        restrict: 'E',
        templateUrl: 'templates/chart.html',
        controller: 'VisualizationController',
        //Going to add this when we actually have a data model to pass to this.
        // For now we are going to monkeypatch our streak
        // require: '^streak'
        scope: {
          data: '='
        },
        link: function(scope, element, attrs) {
          var plotData = scope.data;
          var padding = 20;
          var pathClass = 'path';
          var xScale, yScale, xAxisGen, yAxisGen, lineFun, svg, rawSvg;
          function setChartParameters() {
            xScale = d3.scale.linear()
                       .domain([plotData[0].timeStamp.getDay(), plotData[plotData.length - 1].timeStamp.getDay()])
                       .range([padding + 5, rawSvg.clientWidth + padding]);
            yScale = d3.scale.linear()
                       .domain([0, d3.max(plotData, function(d) {
                         return d.data;
                       })])
                       .range([rawSvg.clientHeight - padding, 0]);
            xAxisGen = d3.svg.axis()
                             .scale(xScale)
                             .orient('bottom')
                             .ticks(plotData.length - 1);
            yAxisGen = d3.svg.axis()
                             .scale(yScale)
                             .orient('left')
                             .ticks(5)

            lineFun = d3.svg.line()
                        .x(function(d) {
                          return xScale(d.timeStamp.getDay());
                        })
                        .y(function(d) {
                          return yScale(d.data);
                        })
                        .interpolate('linear');
          }

          function drawLineChart() {
            setChartParameters();

            svg.append('svg:g')
               .attr('class', 'x axis')
               .attr('transform', 'translate(0, 180)')
               .call(xAxisGen);

            svg.append('svg:g')
               .attr('class', 'y axis')
               .attr('transform', 'translate(20,0)')
               .call(yAxisGen);

            svg.append('svg:path')
               .attr({
                 d: lineFun(plotData),
                 'stroke': 'blue',
                 'stroke-width': 2,
                 'fill': 'none',
                 'class': pathClass
               });
          }
          d3Service.d3().then(function(d3) {
            svg = d3.select(element[0])
              .append('svg')
              .style('width', '1000px')
              .style('height', '1000px')
              .style('padding', '10px');
            rawSvg = element.find("svg")[0];
            drawLineChart();
          });

        }
      };
    }
  ]);
